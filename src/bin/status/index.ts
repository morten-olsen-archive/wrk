import { Command, program } from 'commander';
import { Project } from '../../project';
import { formatOutput } from '../../utils/output';

const setupStatus = (status: Command) => {
  status.action(async () => {
    const { location } = program.opts();
    const project = await Project.load(location);
    const statuses = await project.status();

    await formatOutput(statuses, {
      json: (input) =>
        input.map((status) => ({
          name: status.repo.name,
        })),
      console: (input) => {
        for (const status of input) {
          const { repo, result } = status;
          console.log(`${repo.name} ${result.ahead}/${result.behind}`);
        }
      },
    });
  });
};

export { setupStatus };
