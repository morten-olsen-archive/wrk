import { Command, program } from 'commander';
import { Project } from '../../../project';
import { selectRepo } from '../../../utils/ui';

const setupSelect = (path: Command) => {
  path.action(async () => {
    const { location } = program.opts();
    const project = await Project.load(location);
    const repo = await selectRepo(project);
    process.stdout.write(repo.name);
  });
};

export { setupSelect };
