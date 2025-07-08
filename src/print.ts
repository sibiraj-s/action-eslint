import { endGroup, startGroup, info } from '@actions/core';

export const printItems = (_name: string, items: string[]) => {
  if (items.length === 0) {
    return;
  }

  startGroup('Files for linting.');
  items.forEach((item) => info(`- ${item}`));
  endGroup();
};
