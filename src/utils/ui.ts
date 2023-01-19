import { Project } from '../project';
import inquirer from 'inquirer';
import inquirerPrompt from 'inquirer-autocomplete-prompt';
import fuzzy from 'fuzzy';
import { resolve } from 'path';

const ttys = require('ttys');

const selectRepo = async (project: Project) => {
  const repos = project.repos.map((r) => r.name);
  const prompt = inquirer.createPromptModule({
    output: ttys.stdout,
    input: ttys.stdin,
  });
  prompt.registerPrompt('autocomplete', inquirerPrompt);
  const { name } = await prompt({
    type: 'autocomplete',
    name: 'name',
    source: (_: unknown, input: string) => {
      if (!input) {
        return repos;
      }
      const filtered = fuzzy.simpleFilter(input, repos);
      return filtered;
    },
    // rome-ignore lint/suspicious/noExplicitAny: incorrect types in library
  } as any);
  const repo = project.getRepo(name);
  ttys.stdin.pause();
  return repo;
};

const selectDirectory = async (baseUrl: string) => {
  const prompt = inquirer.createPromptModule({
    output: ttys.stdout,
    input: ttys.stdin,
  });
  const { dir } = await prompt({
    type: 'input',
    name: 'dir',
  });
  return resolve(baseUrl, dir);
};

export { selectRepo, selectDirectory };
