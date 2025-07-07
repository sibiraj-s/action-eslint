import { notice } from '@actions/core';
import { exec } from '@actions/exec';

import inputs from './inputs';
import { disableAnnotations } from './annotations';
import getFiles from './get-files';
import getEslintArgs from './get-eslint-args';

const getExecutionCommand = (): { command: string; args: string[] } => {
  const packageManager = inputs.packageManager.toLowerCase();

  switch (packageManager) {
    case 'pnpm':
      return { command: 'pnpm', args: ['dlx', 'eslint'] };
    case 'npm':
      return { command: 'npx', args: ['eslint'] };
    default:
      throw new Error(`Unsupported package manager: ${packageManager}. Supported: npm, pnpm`);
  }
};

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
  const { command, args } = getExecutionCommand();

  const execArgs = [
    ...args,
    ...files,
    ...eslintArgs,
  ].filter(Boolean);
  const execOptions = { cwd: inputs.workingDirectory };

  await exec(command, execArgs, execOptions);
};
