import { setFailed, getInput, getBooleanInput, getMultilineInput } from '@actions/core';

import { Inputs } from './types';
import { runEslint } from './eslint';

const run = async ():Promise<void> => {
  try {
    const inputs: Inputs = {
      token: getInput('github-token', { required: true }),
      annotations: getBooleanInput('annotations'),
      eslintArgs: getInput('eslint-args').split(' '),
      workingDirectory: getInput('working-directory'),
      extensions: getInput('extensions').split(',').map((ext) => ext.trim()),
      ignoreFile: getInput('ignore-file'),
      ignorePatterns: getMultilineInput('ignore-patterns'),
    };

    await runEslint(inputs);
    process.exit(0);
  } catch (err) {
    setFailed(err.message);
  }
};

run();
