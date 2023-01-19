import { Command } from 'commander';
import { info } from '../../info';
import { formatOutput } from '../../utils/output';
import { blue } from 'chalk';

const setupVersion = (version: Command) => {
  version.action(async () => {
    formatOutput(info, {
      json: (input) => ({
        name: input.name,
        version: input.version,
        paths: {
          data: input.locations.data,
        },
      }),
      rich: (input) => {
        console.log(`${blue('name')}: ${input.name}`);
        console.log(`${blue('version')}: ${input.version}`);
        console.log(`${blue('data-location')}: ${input.locations.data}`);
      } 
    })
  });
};

export { setupVersion };
