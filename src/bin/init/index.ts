import { Command, program } from 'commander';
import { Project } from '../../project';

const setupInit = (init: Command) => {
  init.action(async () => {
    const { location } = program.opts();
    await Project.init(location);
  });
};

export { setupInit };
