import path from 'node:path';
import { notice, startGroup, endGroup, info } from '@actions/core';
import { exec } from '@actions/exec';

import { disableAnnotations } from './annotations';
import getChangedFiles from './get-changed-files';

export interface Inputs {
  token: string;
  annotations: boolean;
  eslintArgs: string[];
  binPath: string;
  extensions: string[];
}

export const runEslint = async (inputs: Inputs): Promise<void> => {
  if (!inputs.annotations) {
    disableAnnotations();
  }

  const changedFiles = await getChangedFiles(inputs.token);

  startGroup('Files changed.');
  changedFiles.forEach((file) => info(`- ${file}`));
  endGroup();

  const files = changedFiles.filter((filename) => {
    const isFileSupported = inputs.extensions.find((ext) => filename.endsWith(`.${ext}`));
    return isFileSupported;
  });

  if (files.length === 0) {
    notice('No files found. Skipping.');
    return;
  }

  startGroup('Files for linting.');
  files.forEach((file) => info(`- ${file}`));
  endGroup();

  const execOptions = [
    path.resolve(inputs.binPath, 'eslint'),
    ...files,
    ...inputs.eslintArgs,
  ].filter(Boolean);

  await exec('node', execOptions);
};
