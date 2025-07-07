import pegasus from 'eslint-config-pegasus';

export default pegasus.tsConfig(
  pegasus.configs.default,
  pegasus.configs.typescript,
  {
    files: ['**/*.ts'],
    languageOptions: {
      parserOptions: {
        projectService: true,
      }
    }
  },
  {
    ignores: ['dist/', 'lib/']
  }
)
