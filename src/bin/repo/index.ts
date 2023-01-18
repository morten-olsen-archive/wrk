import { setupMove } from './move';
import { setupAdd } from './add';
import { setupRemove } from './remove';
import { Command } from 'commander';
import { setupPath } from './path';
import { setupSelect } from './select';

const setupRepo = (program: Command) => {
  const add = program.command('add');
  setupAdd(add);

  const remove = program.command('remove');
  setupRemove(remove);

  const move = program.command('move');
  setupMove(move);

  const path = program.command('path');
  setupPath(path);

  const select = program.command('select');
  setupSelect(select);
};

export { setupRepo };
