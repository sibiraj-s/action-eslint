import path from 'node:path';
import { debug, notice } from '@actions/core';
import { exec } from '@actions/exec';

import { disableAnnotations } from './annotations';
import getChangedFiles from './get-changed-files';

export interface Inputs {
  token: string;
  annotations: boolean;
  eslintArgs: string[];
  binPath: string;
}

export const runEslint = async (inputs: Inputs): Promise<void> => {
  if (!inputs.annotations) {
    disableAnnotations();
  }

  const files = await getChangedFiles(inputs.token);

  if (files.length === 0) {
    notice('No files found. Skipping.');
    return;
  }

  debug('Files for linting...');
  files.forEach(debug);

  const execOptions = [
    path.resolve(inputs.binPath, 'eslint'),
    ...files,
    ...inputs.eslintArgs,
  ].filter(Boolean);

  await exec('node', execOptions);
};
