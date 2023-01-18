import { Command, program } from 'commander';
import { Project } from '../../project';

const setupUpgrade = (upgrade: Command) => {
  upgrade.action(async () => {
    const { location } = program.opts();
    const project = await Project.load(location);
    await project.upgrade();
  });
};

export { setupUpgrade };
