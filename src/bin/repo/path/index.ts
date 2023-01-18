import { Command, program } from 'commander';
import { resolve } from 'path';
import { Project } from '../../../project';

const setupPath = (path: Command) => {
  path.argument('<name>');
  path.action(async (name: string) => {
    const { location } = program.opts();
    const project = await Project.load(location);
    const repoLocation = resolve(location, name);
    const repo = project.getRepo(repoLocation);
    process.stdout.write(repo.root);
  });
};

export { setupPath };
