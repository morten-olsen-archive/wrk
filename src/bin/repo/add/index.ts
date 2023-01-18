import { Command, program } from 'commander';
import { Project } from '../../../project';

const setupAdd = (add: Command) => {
  add.argument('<remote>');
  add.argument('<name>');
  add.action(async (remote: string, name: string) => {
    const { location } = program.opts();
    const project = await Project.load(location);
    await project.add(remote, name);
  });
};

export { setupAdd };
