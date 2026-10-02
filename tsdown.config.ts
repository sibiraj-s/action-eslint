import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: 'src/main.ts',
  outDir: 'dist',
  clean: true,
  sourcemap: true,
  fixedExtension: false,
  deps: {
    alwaysBundle: ['@actions/core', '@actions/exec', '@actions/github', 'ignore'],
    onlyBundle: false,
  },
});
