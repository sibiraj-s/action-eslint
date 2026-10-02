import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { Inputs } from './types';
import ignoreFiles from './ignore-files';

const inputs = vi.hoisted(() => ({}) as Inputs);

vi.mock('./inputs', () => ({ default: inputs }));
vi.mock('@actions/core');

const defaultInputs: Inputs = {
  token: 'token',
  annotations: true,
  eslintArgs: [],
  workingDirectory: '',
  extensions: ['js'],
  ignorePath: '',
  ignorePatterns: [],
  allFiles: false,
  packageManager: 'npm',
};

let tmpDir: string;

beforeEach(() => {
  Object.assign(inputs, defaultInputs);
  tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'action-eslint-'));
});

afterEach(() => {
  fs.rmSync(tmpDir, { recursive: true, force: true });
});

describe('ignoreFiles', () => {
  it('filters files by extension', async () => {
    inputs.extensions = ['js', 'ts'];

    await expect(ignoreFiles(['a.js', 'b.ts', 'c.css', 'd.json'])).resolves.toEqual([
      'a.js',
      'b.ts',
    ]);
  });

  it('returns files relative to the working directory', async () => {
    inputs.workingDirectory = 'app';

    await expect(ignoreFiles(['app/src/a.js', 'other/b.js'])).resolves.toEqual(['src/a.js']);
  });

  it('does not match sibling directories sharing the working directory prefix', async () => {
    inputs.workingDirectory = 'app';

    await expect(
      ignoreFiles(['app/a.js', 'apps/b.js', 'app-legacy/c.js', 'application.js']),
    ).resolves.toEqual(['a.js']);
  });

  it.each(['./app', 'app/', './app/'])(
    'normalizes the working directory %s',
    async (workingDirectory) => {
      inputs.workingDirectory = workingDirectory;

      await expect(ignoreFiles(['app/a.js', 'b.js'])).resolves.toEqual(['a.js']);
    },
  );

  it('applies ignore patterns relative to the working directory', async () => {
    inputs.workingDirectory = 'app';
    inputs.ignorePatterns = ['dist/'];

    await expect(ignoreFiles(['app/dist/a.js', 'app/src/b.js'])).resolves.toEqual(['src/b.js']);
  });

  it('applies the ignore file relative to the working directory', async () => {
    const ignorePath = path.join(tmpDir, '.eslintignore');
    fs.writeFileSync(ignorePath, 'build/\n*.min.js\n');

    inputs.workingDirectory = 'app';
    inputs.ignorePath = ignorePath;

    await expect(
      ignoreFiles(['app/build/a.js', 'app/src/b.min.js', 'app/src/c.js']),
    ).resolves.toEqual(['src/c.js']);
  });

  it('skips a missing ignore file', async () => {
    inputs.ignorePath = path.join(tmpDir, 'missing');

    await expect(ignoreFiles(['a.js'])).resolves.toEqual(['a.js']);
  });
});
