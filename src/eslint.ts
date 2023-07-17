import path from 'node:path';

import { notice } from '@actions/core';
import { exec } from '@actions/exec';

import inputs from './inputs';
import { disableAnnotations } from './annotations';
import getFiles from './get-files';
import getEslintArgs from './get-eslint-args';

export const runEslint = async (): Promise<void> => {
  if (!inputs.annotations) {
    disableAnnotations();
  }

  const files = await getFiles();

  if (files.length === 0) {
    notice('No files found. Skipping.');
    return;
  }

  const eslintArgs = getEslintArgs();

  const execOptions = [
    path.resolve(inputs.workingDirectory, 'node_modules/.bin/eslint'),
    ...files,
    ...eslintArgs,
  ].filter(Boolean);

  await exec('node', execOptions);
};
