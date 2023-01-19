import { Command, program } from 'commander';
import { Project } from '../../../project';
import { selectDirectory, selectRepo } from '../../../utils/ui';

const setupLink = (link: Command) => {
  link.option('--from <from>');
  link.option('--to <to>');
  link.action(async () => {
    const { location } = program.opts();
    let { to, from } = link.opts();
    const project = await Project.load(location);
    if (!from) {
      const repo = await selectRepo(project);
      from = repo.root;
    }
    if (!to) {
      to = await selectDirectory(process.cwd());
    }
    const repo = project.getRepo(from);
    await repo.link(to);
  });
};

export { setupLink };
