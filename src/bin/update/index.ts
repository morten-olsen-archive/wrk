import { Command, program } from 'commander';
import { Project } from '../../project';

const setupUpdate = (update: Command) => {
  update.action(async () => {
    const { location } = program.opts();
    const project = await Project.load(location);
    await project.update();
  });
};

export { setupUpdate };
