import { setFailed, getInput, getBooleanInput } from '@actions/core';

import { Inputs, runEslint } from './eslint';

const run = async ():Promise<void> => {
  try {
    const inputs: Inputs = {
      token: getInput('github-token', { required: true }),
      annotations: getBooleanInput('annotations'),
      eslintArgs: getInput('eslint-args').split(' '),
      rootDir: getInput('root-dir'),
      extensions: getInput('extensions').split(',').map((ext) => ext.trim()),
    };

    await runEslint(inputs);
    process.exit(0);
  } catch (err) {
    setFailed(err.message);
  }
};

run();
