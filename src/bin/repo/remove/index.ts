import { Command, program } from 'commander';
import { resolve } from 'path';
import { Project } from '../../../project';
import { selectRepo } from '../../../utils/ui';

const setupRemove = (remove: Command) => {
  remove.option('--name <name>');
  remove.action(async () => {
    const { location } = program.opts();
    let { name } = remove.opts();
    const project = await Project.load(location);
    if (!name) {
      const repo = await selectRepo(project);
      name = repo.name;
    }
    const target = resolve(location, name);
    await project.remove(target);
  });
};

export { setupRemove };
