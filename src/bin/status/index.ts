import { Command, program } from 'commander';
import { Project } from '../../project';
import { formatOutput } from '../../utils/output';
import { yellow, red } from 'chalk';

const setupStatus = (status: Command) => {
  status.action(async () => {
    const { location } = program.opts();
    const project = await Project.load(location);
    const statuses = await project.status();

    await formatOutput(statuses, {
      json: (input) =>
        input.map((status) => ({
          name: status.repo.name,
          ...status.result,
        })),
      rich: (input) => {
        for (const status of input) {
          const { repo, result } = status;
          if (result.ahead === 0 && result.behind === 0 && result.clean) {
            continue;
          }
          const output = [repo.name];
          if (result.ahead > 0 || result.behind > 0) {
            output.push(yellow(`${result.ahead}/${result.behind}`));
          }
          if (!result.clean) {
            output.push(red('dirty'));
          }
          console.log(output.join(' '));
        }
      },
    });
  });
};

export { setupStatus };
