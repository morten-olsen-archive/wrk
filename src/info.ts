import envPaths from 'env-paths';
import pkg from '../package.json';

const parts = pkg.name.split('/');
const name = parts.pop()!;

const paths = envPaths(name, {
  suffix: '',
});

class Info {
  public get name() {
    return name;
  }

  public get version() {
    return pkg.version;
  }

  public get locations() {
    return {
      config: process.env[`${this.name.toUpperCase()}_CONFIG_LOCATION`] || paths.config,
      data: process.env[`${this.name.toUpperCase()}_DATA_LOCATION`] || paths.data,
    };
  }
}

const info = new Info();

export { info };
