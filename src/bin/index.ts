import { program } from 'commander';
import { Project } from '../project';
import { setupVersion } from './version';
import { setupUpgrade } from './upgrade';
import { setupUpdate } from './update';
import { setupStatus } from './status';
import { setupList } from './list';
import { setupClone } from './clone';
import { setupInit } from './init';
import { setupRepo } from './repo';
import { setupBash } from './tools/bash';

program.option('--location <location>', 'foo', Project.defaultLocation);

const version = program.command('version');
setupVersion(version);

const clone = program.command('clone');
setupClone(clone);

const init = program.command('init');
setupInit(init);

const list = program.command('list');
setupList(list);

const update = program.command('update');
setupUpdate(update);

const upgrade = program.command('upgrade');
setupUpgrade(upgrade);

const status = program.command('status');
setupStatus(status);

const repo = program.command('repo');
setupRepo(repo);

const tools = program.command('tools');
setupBash(tools);

program.parse(process.argv);
