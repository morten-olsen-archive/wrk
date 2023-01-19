import { Command } from 'commander';
import { info } from '../../../info';

const CMD = info.name;

const script = `
function ${info.name}-cd {
  NAME=\`${CMD} repo select\`;
  TARGET=\`${CMD} repo path --name="$NAME"\`;

  cd "$TARGET";
}
`;

const setupBash = (bash: Command) => {
  bash.action(() => {
    process.stdout.write(script);
  });
};

export { setupBash };
