import { describe, expect, it } from 'vitest';

import { parseEslintArgs, parseExtensions } from './parse';

describe('parseEslintArgs', () => {
  it('splits on any whitespace and drops empty args', () => {
    expect(parseEslintArgs('  --quiet   --max-warnings=0\n--cache ')).toEqual([
      '--quiet',
      '--max-warnings=0',
      '--cache',
    ]);
  });

  it('returns no args for an empty input', () => {
    expect(parseEslintArgs('')).toEqual([]);
  });
});

describe('parseExtensions', () => {
  it('trims extensions', () => {
    expect(parseExtensions('js, ts ,tsx')).toEqual(['js', 'ts', 'tsx']);
  });

  it('strips leading dots', () => {
    expect(parseExtensions('.js,.ts')).toEqual(['js', 'ts']);
  });

  it('drops empty entries', () => {
    expect(parseExtensions('js,,ts,')).toEqual(['js', 'ts']);
    expect(parseExtensions('')).toEqual([]);
  });
});
