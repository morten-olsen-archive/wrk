import { Command, program } from 'commander';
import { resolve } from 'path';
import { Project } from '../../../project';
import { selectRepo } from '../../../utils/ui';

const setupPath = (path: Command) => {
  path.option('--name <name>');
  path.action(async () => {
    const { location } = program.opts();
    let { name } = path.opts();
    const project = await Project.load(location);
    if (!name) {
      const repo = await selectRepo(project);
      name = repo.name;
    }
    const repoLocation = resolve(location, name);
    const repo = project.getRepo(repoLocation);
    process.stdout.write(repo.root);
  });
};

export { setupPath };
