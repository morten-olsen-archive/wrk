import { Command, program } from 'commander';
import { resolve } from 'path';
import { Project } from '../../../project';

const setupMove = (move: Command) => {
  move.argument('<from>');
  move.argument('<to>');
  move.action(async (from: string, to: string) => {
    const { location } = program.opts();
    const project = await Project.load(location);
    const repo = project.getRepo(resolve(from));
    await repo.move(to);
  });
};

export { setupMove };
