import { Command } from 'commander';
import { info } from '../../../info';

const script = `
function ${info.name}-cd {
  NAME=\`gitproj repo select\`;
  TARGET=\`gitproj repo path --name="$NAME"\`;

  cd "$TARGET";
}
`;

const setupBash = (bash: Command) => {
  bash.action(() => {
    process.stdout.write(script);
  });
};

export { setupBash };
