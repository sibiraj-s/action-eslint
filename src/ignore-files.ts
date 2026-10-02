import fs from 'node:fs';
import path from 'node:path';

import ignore from 'ignore';
import { notice, startGroup, endGroup, info } from '@actions/core';

import { FileNamesList } from './types';
import inputs from './inputs';
import { resovlePath } from './path';

// Changed files are repo-relative posix paths; return them relative to the working directory
const toWorkingDirectoryFiles = (files: FileNamesList): FileNamesList => {
  const workingDirectory = path.posix.join('/', inputs.workingDirectory);

  return files
    .map((file) => path.posix.relative(workingDirectory, path.posix.join('/', file)))
    .filter((file) => file !== '' && file !== '..' && !file.startsWith('../'));
};

const ignoreFiles = async (changedFiles: FileNamesList): Promise<FileNamesList> => {
  const ig = ignore();

  const files = toWorkingDirectoryFiles(changedFiles);

  if (inputs.ignorePath) {
    const ignoreFile = resovlePath(inputs.ignorePath);

    if (fs.existsSync(ignoreFile)) {
      info(`Using ignore file ${inputs.ignorePath}, filtering files changed.`);
      const ignoreFileContent = await fs.promises.readFile(ignoreFile, 'utf-8');
      ig.add(ignoreFileContent);
    } else {
      notice(`Provided ignore file ${inputs.ignorePath} doesn't exist. Skipping...`);
    }
  }

  if (inputs.ignorePatterns.length > 0) {
    startGroup('Using ignore pattern, filtering files changed.');
    inputs.ignorePatterns.forEach((pattern) => info(`- ${pattern}`));
    endGroup();

    ig.add(inputs.ignorePatterns);
  }

  return files
    .filter((filename) => inputs.extensions.some((ext) => filename.endsWith(`.${ext}`)))
    .filter((filename) => !ig.ignores(filename));
};

export default ignoreFiles;
