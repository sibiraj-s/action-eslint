import { endGroup, startGroup } from '@actions/core';
import { info } from 'console';

export const printItems = (name:string, items: string[]) => {
  if (items.length === 0) {
    return;
  }

  startGroup('Files for linting.');
  items.forEach((item) => info(`- ${item}`));
  endGroup();
};
