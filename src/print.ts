import { endGroup, startGroup, info } from '@actions/core';

export const printItems = (name: string, items: string[]) => {
  if (items.length === 0) {
    return;
  }

  startGroup(name);
  items.forEach((item) => info(`- ${item}`));
  endGroup();
};
