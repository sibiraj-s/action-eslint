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
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 16
      - run: npm ci # or yarn install
      - uses: sibiraj-s/action-eslint@v2
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }} # optional
          eslint-args: '--ignore-path=.gitignore --quiet'
          extensions: 'js,jsx,ts,tsx'
          annotations: true
```

### Ignoring files

Ignore files changed in a PR.

```yml
steps:
  - uses: sibiraj-s/action-eslint@v2
    with:
      ignore-file: .eslintignore
      ignore-pattern: |
        dist/
        lib/
```

The files that are being filtered based on these options are excluded from the set of changed files before being sent to eslint.
This feature proves useful in situations where a pull request or commit contains files that should not be linted,
thus avoiding the occurrence of [ignored file warnings](https://eslint.org/docs/latest/use/configure/ignore#ignored-file-warnings).

You can use this in addition to `ignore-path`/`ignore-patterns` in `eslint-args`.

```yml
steps:
  - uses: sibiraj-s/action-eslint@v2
    with:
      eslint-args: '--ignore-path=.gitignore --quiet'
      ignore-file: .eslintignore
      ignore-pattern: |
        dist/
        lib/
```

### Root directory

The `root-dir` option can be especially useful when the eslint installation is not located in the root directory.

```yaml
steps:
  - uses: action@v2
    with:
      root-dir: apps/website
```

Note: When using this option, options such as `ignore-file` will be resolved based on the specified directory.

## Security

For better security it is recommended to pin actions to a full length commit SHA.

Read more on [using third-party actions](https://docs.github.com/en/actions/learn-github-actions/security-hardening-for-github-actions#using-third-party-actions)

## Known Issues

- Yarn 2+ is not supported

## Debugging

To enable debug logs, set secret `ACTIONS_STEP_DEBUG` to `true`. Refer docs more details https://docs.github.com/en/actions/managing-workflow-runs/enabling-debug-logging#enabling-step-debug-logging
