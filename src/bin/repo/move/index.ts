import { Command, program } from 'commander';
import { resolve } from 'path';
import { Project } from '../../../project';
import { selectDirectory, selectRepo } from '../../../utils/ui';

const setupMove = (move: Command) => {
  move.option('--from <from>');
  move.option('--to <to>');
  move.action(async () => {
    const { location } = program.opts();
    let { from, to } = move.opts();
    const project = await Project.load(location);
    if (!from) {
      const repo = await selectRepo(project);
      from = repo.root;
    }
    if (!to) {
      to = await selectDirectory(project.root);
    }
    const repo = project.getRepo(resolve(from));
    await repo.move(to);
  });
};

export { setupMove };
