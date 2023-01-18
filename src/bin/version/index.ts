import { Command, program } from 'commander';
import pkg from '../../../package.json';

const setupVersion = (version: Command) => {
  version.action(async () => {
    const { location } = program.opts();
    const { version, name } = pkg;
    console.log(location);
  });
};

export { setupVersion };
