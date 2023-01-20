import { mkdirp, symlink } from 'fs-extra';
import { relative, resolve } from 'path';
import simpleGit, { SimpleGit } from 'simple-git';
import { Project } from '../project';

class Repo {
  #repo: SimpleGit;
  #project: Project;
  #root: string;

  private constructor(location: string, project: Project) {
    this.#root = location;
    this.#repo = simpleGit(location);
    this.#project = project;
  }

  #getRoot = async () => {
    const output = await this.#repo.raw('rev-parse', {
      '--show-toplevel': null,
    });
    return output.trim();
  };

  public get root() {
    return this.#root;
  }

  public get name() {
    return relative(this.#project.root, this.root);
  }

  public load = async () => {
  };

  public update = async () => {
    await this.#repo.fetch();
  };

  public pull = async () => {
    await this.#repo.pull();
  };

  public status = async () => {
    const status = await this.#repo.status();
    return {
      clean: status.isClean(),
      behind: status.behind,
      ahead: status.ahead,
    };
  };

  public static load = async (location: string, project: Project) => {
    const repo = new Repo(location, project);
    await repo.load();
    return repo;
  };

  public move = async (location: string) => {
    const rootDir = resolve(this.#project.root, location);
    await mkdirp(resolve(rootDir, '..'));
    this.#project.git.mv(this.root, location);
  };

  public link = async (location: string) => {
    await mkdirp(resolve(location, '..'));
    await symlink(this.root, location);
  };
}

export { Repo };
