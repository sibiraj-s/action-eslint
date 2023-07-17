import fs from 'node:fs';

import ignore from 'ignore';
import { notice, startGroup, endGroup, info } from '@actions/core';

import { FileNamesList } from './types';
import inputs from './inputs';
import { resovlePath } from './path';

const filterWorkingDirectoryFiles = (files: FileNamesList) => {
  if (!inputs.workingDirectory) {
    return files;
  }

  return files.filter((file) => file.startsWith(inputs.workingDirectory));
};

const ignoreFiles = async (changedFiles: FileNamesList): Promise<FileNamesList> => {
  const ig = ignore();

  const files = filterWorkingDirectoryFiles(changedFiles);

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
    .filter((filename) => {
      const isFileSupported = inputs.extensions.find((ext) => filename.endsWith(`.${ext}`));
      return isFileSupported;
    })
    .filter((filename) => !ig.ignores(filename));
};

export default ignoreFiles;
