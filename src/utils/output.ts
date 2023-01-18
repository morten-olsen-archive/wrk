import { program } from 'commander';

type Formats<T> = {
  json?: (input: T) => any;
  console: (input: T) => void | Promise<void>;
};

program.option('-f --format <format>', '', 'console');

const formatOutput = async <T>(data: T, renders: Formats<T>) => {
  const { format } = program.opts();
  switch (format) {
    case 'json': {
      const json = renders.json ? Promise.resolve(renders.json(data)) : data;
      const output = JSON.stringify(json);
      process.stdout.write(output);
      return;
    }
    case 'console': {
      await Promise.resolve(renders.console(data));
      return;
    }
    default: {
      throw new Error(`unsupported format ${format}`);
    }
  }
};

export { formatOutput };
