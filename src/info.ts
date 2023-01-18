import envPaths from 'env-paths';
import pkg from '../package.json';

const paths = envPaths(pkg.name, {
  suffix: '',
});
class Info {
  public get name() {
    const parts = pkg.name.split('/');
    return parts.pop()!;
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
