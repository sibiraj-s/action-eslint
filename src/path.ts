import path from 'node:path';

import inputs from './inputs';

export const resovlePath = (pathStr: string): string => {
  return path.resolve(inputs.workingDirectory, pathStr);
};
