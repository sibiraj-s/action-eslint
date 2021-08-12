import path from 'path';

import {
  setFailed, getInput, getBooleanInput,
  info, debug,
} from '@actions/core';
import { exec } from '@actions/exec';
import getChangedFiles from './getChangedFiles';

const run = async () => {
  try {
    const token = getInput('github-token', { required: true });

    const enableAnnotations = getBooleanInput('annotations');
    if (!enableAnnotations) {
      debug('Disabling Annotations');
      info('##[remove-matcher owner=eslint-compact]');
      info('##[remove-matcher owner=eslint-stylish]');
    }

    const files = await getChangedFiles(token);

    debug('Files for linting...');
    files.forEach(debug);

    if (files.length === 0) {
      return info('No files found. Skipping');
    }

    const eslintArgs = getInput('eslintArgs').split(' ');

    await exec('node', [
      path.join(process.cwd(), 'node_modules/eslint/bin/eslint'),
      ...files,
      ...eslintArgs,
    ].filter(Boolean));

    return process.exit(0);
  } catch (err) {
    return setFailed(err.message);
  }
};

run();
