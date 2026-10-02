import { getBooleanInput, getInput, getMultilineInput } from '@actions/core';

import { Inputs } from './types';
import { parseEslintArgs, parseExtensions } from './parse';

const inputs: Inputs = {
  token: getInput('token', { required: true }),
  annotations: getBooleanInput('annotations'),
  eslintArgs: parseEslintArgs(getInput('eslint-args')),
  workingDirectory: getInput('working-directory'),
  extensions: parseExtensions(getInput('extensions')),
  ignorePath: getInput('ignore-path'),
  ignorePatterns: getMultilineInput('ignore-patterns'),
  allFiles: getBooleanInput('all-files'),
  packageManager: getInput('package-manager'),
};

export default inputs;
