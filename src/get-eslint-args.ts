import inputs from './inputs';
import { resovlePath } from './path';

const hasArg = (searchArg: string) => {
  return inputs.eslintArgs.some((arg) => arg.indexOf(`--${searchArg}`) !== -1);
};
const getEslintArgs = (): string[] => {
  const args = [...inputs.eslintArgs];

  if (inputs.allFiles) {
    if (!hasArg('ignore-path') && inputs.ignorePath) {
      const ignoreFilePath = resovlePath(inputs.ignorePath);
      args.push(`--ignore-path=${ignoreFilePath}`);
    }

    if (!hasArg('ignore-patterns') && inputs.ignorePatterns.length > 0) {
      inputs.ignorePatterns.forEach((pattern) => {
        args.push(`--ignore-pattern=${pattern}`);
      });
    }

    if (!hasArg('ext') && inputs.extensions.length > 0) {
      inputs.extensions.forEach((ext) => {
        args.push(`--ext=.${ext}`);
      });
    }
  }

  return args;
};

export default getEslintArgs;
