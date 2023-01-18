import { Command, program } from 'commander';
import { Project } from '../../project';

const setupClone = (clone: Command) => {
  clone.argument('<remote>');
  clone.action(async (remote: string) => {
    const { location } = program.opts();
    await Project.clone(remote, location);
  });
};

export { setupClone };
