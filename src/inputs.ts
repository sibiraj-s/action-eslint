import { getBooleanInput, getInput, getMultilineInput } from '@actions/core';

import { Inputs } from './types';

const inputs: Inputs = {
  token: getInput('token', { required: true }),
  annotations: getBooleanInput('annotations'),
  eslintArgs: getInput('eslint-args').split(' '),
  workingDirectory: getInput('working-directory'),
  extensions: getInput('extensions')
    .split(',')
    .map((ext) => ext.trim()),
  ignorePath: getInput('ignore-path'),
  ignorePatterns: getMultilineInput('ignore-patterns'),
  allFiles: getBooleanInput('all-files'),
  packageManager: getInput('package-manager'),
};

export default inputs;
