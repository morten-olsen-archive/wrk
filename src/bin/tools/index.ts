import { Command } from 'commander';
import { setupBash } from './bash';

const setupTools = (tools: Command) => {
  const bash = tools.command('bash');
  setupBash(bash);
};

export { setupTools };
