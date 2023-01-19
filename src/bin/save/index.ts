
import { Command, program } from 'commander';
import { Project } from '../../project';

const setupSave = (status: Command) => {
  status.action(async () => {
    const { location } = program.opts();
    const project = await Project.load(location);
    await project.save();
  });
};

export { setupSave };
