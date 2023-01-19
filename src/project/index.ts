import simpleGit, { SimpleGit } from 'simple-git';
import { resolve } from 'path';
import { mkdirp } from 'fs-extra';
import { Repo } from '../repo';
import { existsSync } from 'fs';
import { info } from '../info';

const setup = Symbol('setup');

class Project {
  #location: string;
  #repo?: SimpleGit;
  #repos?: Repo[];

  private constructor(location: string) {
    this.#location = location;
  }

  public get git() {
    if (!this.#repo) {
      throw new Error('Not setup');
    }
    return this.#repo;
  }

  public get repos() {
    if (!this.#repos) {
      throw new Error('Not loaded');
    }
    return this.#repos;
  }

  public get root() {
    return this.#location;
  }

  public getRepo = (location: string) => {
    location = resolve(this.#location, location);
    const repo = this.repos.find((r) => r.root === location);
    if (!repo) {
      throw new Error('Repo not found');
    }
    return repo;
  };

  public apply = async <T>(action: (repo: Repo) => Promise<T>) => {
    const response = await Promise.all(
      this.repos.map(async (repo) => {
        const result = await action(repo);
        return {
          repo,
          result,
        };
      }),
    );
    return response;
  };

  public add = async (url: string, target: string) => {
    await this.git.submoduleAdd(url, target);
    await this[setup]();
  };

  public remove = async (target: string) => {
    const repo = this.getRepo(target);
    await this.git.rm(repo.root);
  };

  public [setup] = async () => {
    this.#repo = simpleGit(this.#location);
    const submodules = await this.#repo.raw('submodule', 'status', {
    });
    const paths = submodules
      .split('\n')
      .filter(Boolean)
      .map((line) => line.trim().split(' ')[1].trim());
    this.#repos = await Promise.all(paths.map((path) => Repo.load(resolve(this.root, path), this)));
  };

  public update = async () => {
    await this.apply((r) => r.update());
  };

  public upgrade = async () => {
    await this.update();
    const statuses = await this.status();
    for (const status of statuses) {
      const { result, repo } = status;
      const canUpgradeSafely = result.clean;
      if (!canUpgradeSafely) {
        continue;
      }
      await repo.pull();
    }
  };

  public status = async () => {
    const result = await this.apply(async (r) => r.status());
    return result;
  };

  public save = async () => {
    await this.git.fetch();
    const status = await this.git.status();
    const isClean = status.isClean();
    if (!isClean) {
      await this.git.add('**/*');
      await this.git.commit('update');
    }

    if (status.behind) {
      await this.git.pull(undefined, undefined, {
        '--rebase': null,
      });
    }

    if (!isClean || status.ahead) {
      await this.git.push();
    }
  };

  public static get defaultLocation() {
    return info.locations.data;
  }

  public static load = async (location: string) => {
    if (!existsSync(location)) {
      throw new Error(`${location} does not exist`);
    }
    const isGit = await simpleGit(location).checkIsRepo();
    if (!isGit) {
      throw new Error(`${location} is not a git repo`);
    }
    const project = new Project(location);
    await project[setup]();
    return project;
  };

  public static init = async (location: string) => {
    if (existsSync(location)) {
      throw new Error('Location already exists');
    }
    await mkdirp(location);
    await simpleGit(location).init();
  };

  public static clone = async (remote: string, location: string) => {
    if (existsSync(location)) {
      throw new Error('Location already exists');
    }
    await mkdirp(location);
    await simpleGit(location).clone(remote);
    return Project.load(location);
  };
}

export { Project };
