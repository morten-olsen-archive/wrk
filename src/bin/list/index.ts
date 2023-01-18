import { Command, program } from 'commander';
import { Project } from '../../project';

const setupList = (list: Command) => {
  list.action(async () => {
    const { location } = program.opts();
    const project = await Project.load(location);
    for (const repo of project.repos) {
      console.log(repo.name);
    }
  });
};

export { setupList };
