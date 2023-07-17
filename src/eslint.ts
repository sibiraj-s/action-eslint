import path from 'node:path';

import { notice, startGroup, endGroup, info } from '@actions/core';
import { exec } from '@actions/exec';

import inputs from './inputs';
import { disableAnnotations } from './annotations';
import getChangedFiles from './get-changed-files';
import ignoreFiles from './ignore-files';

export const runEslint = async (): Promise<void> => {
  if (!inputs.annotations) {
    disableAnnotations();
  }

  const changedFiles = await getChangedFiles(inputs.token);

  startGroup('Files changed.');
  changedFiles.forEach((file) => info(`- ${file}`));
  endGroup();

  const files = await ignoreFiles(changedFiles);

  if (files.length === 0) {
    notice('No files found. Skipping.');
    return;
  }

  startGroup('Files for linting.');
  files.forEach((file) => info(`- ${file}`));
  endGroup();

  const execOptions = [
    path.resolve(inputs.workingDirectory, 'node_modules/.bin/eslint'),
    ...files,
    ...inputs.eslintArgs,
  ].filter(Boolean);

  await exec('node', execOptions);
};
