import path from 'node:path';

import { beforeEach, describe, expect, it, vi } from 'vitest';

import { Inputs } from './types';
import getEslintArgs from './get-eslint-args';

const inputs = vi.hoisted(() => ({}) as Inputs);

vi.mock('./inputs', () => ({ default: inputs }));

beforeEach(() => {
  Object.assign(inputs, {
    token: 'token',
    annotations: true,
    eslintArgs: ['--quiet'],
    workingDirectory: '',
    extensions: ['js', 'ts'],
    ignorePath: '',
    ignorePatterns: ['dist/'],
    allFiles: false,
    packageManager: 'npm',
  } satisfies Inputs);
});

describe('getEslintArgs', () => {
  it('passes only user args when linting changed files', () => {
    expect(getEslintArgs()).toEqual(['--quiet']);
  });

  it('adds ignore patterns and extensions when linting all files', () => {
    inputs.allFiles = true;

    expect(getEslintArgs()).toEqual([
      '--quiet',
      '--ignore-pattern=dist/',
      '--ext=.js',
      '--ext=.ts',
    ]);
  });

  it('adds the resolved ignore path when linting all files', () => {
    inputs.allFiles = true;
    inputs.ignorePatterns = [];
    inputs.extensions = [];
    inputs.workingDirectory = 'app';
    inputs.ignorePath = '.eslintignore';

    expect(getEslintArgs()).toEqual([
      '--quiet',
      `--ignore-path=${path.resolve('app', '.eslintignore')}`,
    ]);
  });

  it('keeps a user provided ignore path', () => {
    inputs.allFiles = true;
    inputs.ignorePatterns = [];
    inputs.extensions = [];
    inputs.eslintArgs = ['--ignore-path=.gitignore'];
    inputs.ignorePath = '.eslintignore';

    expect(getEslintArgs()).toEqual(['--ignore-path=.gitignore']);
  });
});
