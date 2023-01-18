import { Command, program } from 'commander';
import { resolve } from 'path';
import { Project } from '../../../project';

const setupRemove = (remove: Command) => {
  remove.argument('<name>');
  remove.action(async (name: string) => {
    const { location } = program.opts();
    const target = resolve(location, name);
    const project = await Project.load(location);
    await project.remove(target);
  });
};

export { setupRemove };
