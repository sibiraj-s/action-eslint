import { startGroup, info, endGroup } from '@actions/core';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { printItems } from './print';

vi.mock('@actions/core');

beforeEach(() => {
  vi.clearAllMocks();
});

describe('printItems', () => {
  it('uses the given name as the group title', () => {
    printItems('Files changed.', ['a.js', 'b.js']);

    expect(startGroup).toHaveBeenCalledWith('Files changed.');
    expect(info).toHaveBeenCalledWith('- a.js');
    expect(info).toHaveBeenCalledWith('- b.js');
    expect(endGroup).toHaveBeenCalledOnce();
  });

  it('prints nothing for an empty list', () => {
    printItems('Files changed.', []);

    expect(startGroup).not.toHaveBeenCalled();
  });
});
