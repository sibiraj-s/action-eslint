# Action ESLint

> GitHub Action that runs ESLint on files changed in a Pull Request.

![Lint](https://github.com/sibiraj-s/action-eslint/workflows/Lint/badge.svg)

![Annotation](assets/annotation.png)

## Usage

`.github/workflows/lint.yml`:

```yml
name: Lint

on:
  pull_request:
  push:
    branches:
      - master

jobs:
  eslint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci # or yarn install
      - uses: sibiraj-s/action-eslint@v3
        with:
          token: ${{ secrets.GITHUB_TOKEN }} # optional
          eslint-args: '--ignore-path=.gitignore --quiet'
          extensions: 'js,jsx,ts,tsx'
          annotations: true
```

### Ignoring files

Ignore files changed in a PR.

```yml
steps:
  - uses: sibiraj-s/action-eslint@v3
    with:
      ignore-path: .eslintignore
      ignore-patterns: |
        dist/
        lib/
```

The files that are being filtered based on these options are excluded from the set of changed files before being sent to
eslint. This feature proves useful in situations where a pull request or commit contains files that should not be
linted, thus avoiding the occurrence of [ignored file warnings](https://eslint.org/docs/latest/use/configure/ignore#ignored-file-warnings).

You can use this in addition to `ignore-path`/`ignore-patterns` in `eslint-args`.

```yml
steps:
  - uses: sibiraj-s/action-eslint@v3
    with:
      eslint-args: '--ignore-path=.gitignore --quiet'
      ignore-path: .eslintignore
      ignore-patterns: |
        dist/
        lib/
```

### Working directory

The `working-directory` option can be especially useful when the eslint installation is not located in the root directory.

```yml
steps:
  - uses: sibiraj-s/action-eslint@v3
    with:
      working-directory: apps/website
```

Note: When using this option, options such as `ignore-path` will be resolved based on the specified directory and files
outside this folder will be skipped too.

### Running linter on all files

Typically, if you only want to run eslint on all files, this action is unnecessary. However, there are specific situations,
such as when a change is made to the `.eslintrc` file, where you may want to lint all files.

```yml
steps:
  - uses: sibiraj-s/action-eslint@v3
    with:
      all-files: true
```

Note: When using this input, if the `eslint-args` has the `ignore-path` option the input `ingore-path` will be ignored

```yml
steps:
  - uses: sibiraj-s/action-eslint@v3
    with:
      all-files: true
      eslint-args: '--ignore-path=.gitignore --quiet'
      ignore-path: .eslintignore # will be ignored since ignore-path is already given in eslint-args
```

Example to Run lint on all files when `.eslintrc` changes

```yml
steps:
  - uses: actions/checkout@v4
  - uses: dorny/paths-filter@v3
    id: filter
    with:
      filters: |
        eslintrc:
          - '.eslintrc*'

  # run eslint on all files if eslintrc changes
  - name: Run eslint on changed files
    if: steps.filter.outputs.eslintrc == 'false'
    uses: sibiraj-s/action-eslint@v3
    with:
      all-files: ${{ steps.filter.outputs.eslintrc == 'true' }}
```

## Security

For better security it is recommended to pin actions to a full length commit SHA.

Read more on [using third-party actions](https://docs.github.com/en/actions/learn-github-actions/security-hardening-for-github-actions#using-third-party-actions)

## Known Issues

- Yarn 2+ is not supported

## Debugging

To enable debug logs, set secret `ACTIONS_STEP_DEBUG` to `true`. Refer docs more details
https://docs.github.com/en/actions/managing-workflow-runs/enabling-debug-logging#enabling-step-debug-logging

## Testing

The action can be testing using [act](https://nektosact.com). Run the following command to test the action:

```bash
act push
```
