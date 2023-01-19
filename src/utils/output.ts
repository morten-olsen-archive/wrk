import { program } from 'commander';

type Formats<T> = {
  json?: (input: T) => any;
  rich: (input: T) => void | Promise<void>;
};

program.option('--format <format>', '', 'rich');

const formatOutput = async <T>(data: T, renders: Formats<T>) => {
  const { format } = program.opts();
  switch (format) {
    case 'json': {
      const json = renders.json ? await Promise.resolve(renders.json(data)) : data;
      const output = JSON.stringify(json);
      process.stdout.write(output);
      return;
    }
    case 'rich': {
      await Promise.resolve(renders.rich(data));
      return;
    }
    default: {
      throw new Error(`unsupported format ${format}`);
    }
  }
};

export { formatOutput };
