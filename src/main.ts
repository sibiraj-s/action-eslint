import { setFailed } from '@actions/core';

import { runEslint } from './eslint';

const run = async ():Promise<void> => {
  try {
    await runEslint();
    process.exit(0);
  } catch (err) {
    setFailed(err.message);
  }
};

run();
