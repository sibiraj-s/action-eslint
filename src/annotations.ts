import { info, debug } from '@actions/core';

export const disableAnnotations = (): void => {
  debug('Disabling Annotations');
  info('##[remove-matcher owner=eslint-compact]');
  info('##[remove-matcher owner=eslint-stylish]');
};
