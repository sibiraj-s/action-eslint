export const parseEslintArgs = (value: string): string[] => value.split(/\s+/).filter(Boolean);

export const parseExtensions = (value: string): string[] =>
  value
    .split(',')
    .map((ext) => ext.trim().replace(/^\.+/, ''))
    .filter(Boolean);
