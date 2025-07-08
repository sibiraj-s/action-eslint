# CHANGELOG

All notable changes to this project will be documented in this file.

> **Tags**
>
> - Features
> - Bug Fixes
> - Performance Improvements
> - Enhancements
> - Dependency Updates
> - Breaking Changes
> - Documentation
> - Internal
> - Unreleased

## v4.0.1 (2025-07-08)

#### Bug Fixes

- fix usage of logger ([502aee5](https://github.com/sibiraj-s/action-eslint/commit/502aee5))
- fix GitHub rest API usage ([6ab9fd68](https://github.com/sibiraj-s/action-eslint/commit/6ab9fd68))

## v4.0.0 (2025-07-08)

#### Breaking Changes

- The action is now ESM ([d9543bd](https://github.com/sibiraj-s/action-eslint/commit/d9543bd))
- Action runtime updated to Node.js 20 ([5580b04](https://github.com/sibiraj-s/action-eslint/commit/5580b04))
- Drop `use-npx` option, by default it uses `npx` for `npm` and `pnpm dlx` for `pnpm` ([f7b0bf2](https://github.com/sibiraj-s/action-eslint/commit/f7b0bf2))

#### Features

- Add pnpm support ([f7b0bf2](https://github.com/sibiraj-s/action-eslint/commit/f7b0bf2))

#### Bug Fixes

- Fix exec working directory ([548a14a](https://github.com/sibiraj-s/action-eslint/commit/548a14a))

## v3.0.1 (2023-08-08)

#### Bug Fixes

- Fix all-files to accept boolean input ([76bafe1](https://github.com/sibiraj-s/action-eslint/commit/76bafe1))

## v3.0.0 (2023-07-17)

#### Breaking Changes

- Rename input `root-dir` to `working-directory` ([dd4ab68](https://github.com/sibiraj-s/action-eslint/commit/dd4ab68))
- Rename input `github-token` to `token` ([2a30aa5](https://github.com/sibiraj-s/action-eslint/commit/2a30aa5))
- Rename input `ignore-file` to `ignore-path` ([d025a5d](https://github.com/sibiraj-s/action-eslint/commit/d025a5d))

#### Features

- Add option to lint all files ([5e82983](https://github.com/sibiraj-s/action-eslint/commit/5e82983))

## v2.2.1 (2023-07-17)

#### Bug Fixes

- Filter files correctly when the root-dir option is set ([d9bb279](https://github.com/sibiraj-s/action-eslint/commit/d9bb279))

## v2.2.0 (2023-07-16)

#### Features

- Add option `ignore-file` ([d9bb279](https://github.com/sibiraj-s/action-eslint/commit/d9bb279))
- Add option `ignore-patterns` ([2b3a054](https://github.com/sibiraj-s/action-eslint/commit/2b3a054))
- Add option `root-dir` ([3cb3ba9](https://github.com/sibiraj-s/action-eslint/commit/3cb3ba9))

#### Bug Fixes

- Use correct bin path ([3cb3ba9](https://github.com/sibiraj-s/action-eslint/commit/3cb3ba9))

## v2.1.2 (2022-08-24)

#### Dependency Updates

- Update @actions/github to v5.0.3 ([e71e789](https://github.com/sibiraj-s/action-eslint/commit/e71e789))
- Update @actions/core to v1.9.1 ([c41dfcc](https://github.com/sibiraj-s/action-eslint/commit/c41dfcc))

## v2.1.1 (2022-02-27)

#### Enhancements

- Print changed files ([e522c35](https://github.com/sibiraj-s/action-eslint/commit/e522c35))

#### Dependency Updates

- Update @vercel/ncc to v0.33.3 ([9a21f96](https://github.com/sibiraj-s/action-eslint/commit/9a21f96))
- Move @octokit/types to devDependencies ([c6b868b](https://github.com/sibiraj-s/action-eslint/commit/c6b868b))

## v2.1.0 (2021-08-12)

#### Enhancements

- Run action with nodejs 16 ([a6b82ed](https://github.com/sibiraj-s/action-eslint/commit/a6b82ed))

#### Dependency Updates

- Update @vercel/ncc to v0.33.0 ([6b76f89](https://github.com/sibiraj-s/action-eslint/commit/6b76f89))

## v2.0.0 (2021-08-12)

#### Enhancements

- `github-token` is optional ([10b7645](https://github.com/sibiraj-s/action-eslint/commit/10b7645))

#### Breaking Changes

- Rename input `eslintArgs` to `eslint-args` ([a926a0e](https://github.com/sibiraj-s/action-eslint/commit/a926a0e))
- `env.GITHUB_TOKEN` is now `with.github-token` ([10b7645](https://github.com/sibiraj-s/action-eslint/commit/10b7645))

## v1.1.3 (2021-08-12)

#### Dependency Updates

- Update @vercel/ncc to v0.29.0 ([da80066](https://github.com/sibiraj-s/action-eslint/commit/da80066))
- Update @octokit/types to v6.25.0 ([5cecebc](https://github.com/sibiraj-s/action-eslint/commit/5cecebc))
- Update @actions/github to v5.0.0 ([d731913](https://github.com/sibiraj-s/action-eslint/commit/d731913))
- Update @actions/exec to v1.1.0 ([828f2f0](https://github.com/sibiraj-s/action-eslint/commit/828f2f0))
- Update @actions/core to v1.4.0 ([a1dfa29](https://github.com/sibiraj-s/action-eslint/commit/a1dfa29))
- Update devDependencies ([f31df13](https://github.com/sibiraj-s/action-eslint/commit/f31df13))

## v1.1.2 (2021-04-20)

#### Bug Fixes

- Fix forwarding arguments to eslint ([cec9556](https://github.com/sibiraj-s/action-eslint/commit/cec9556))

## v1.1.1 (2021-04-15)

#### Bug Fixes

- Trim extensions input ([a0c220b](https://github.com/sibiraj-s/action-eslint/commit/a0c220b))

#### Dependency Updates

- Update `@actions/core` to v1.2.7 ([1b17160](https://github.com/sibiraj-s/action-eslint/commit/1b17160))
- Update `@octokit/types` to v6.13.0 ([1b17160](https://github.com/sibiraj-s/action-eslint/commit/1b17160))
- Update devDependencies ([1b17160](https://github.com/sibiraj-s/action-eslint/commit/1b17160))

## v1.1.0 (2021-01-30)

#### Features

- Add option to disable annotations ([bb12546](https://github.com/sibiraj-s/action-eslint/commit/bb12546))

## v1.0.2 (2021-01-17)

#### Dependency Updates

- Update `@octokit/types` to v6 ([713dfcd](https://github.com/sibiraj-s/action-eslint/commit/713dfcd))
- Update devDependencies ([534f79d](https://github.com/sibiraj-s/action-eslint/commit/534f79d)), ([153f0db](https://github.com/sibiraj-s/action-eslint/commit/153f0db))

#### Internal

- Update `@actions/setup-node` to v2 stable ([5522509](https://github.com/sibiraj-s/action-eslint/commit/5522509))
- Update LICENSE ([ebbfc1f](https://github.com/sibiraj-s/action-eslint/commit/ebbfc1f))

## v1.0.1 (2020-10-02)

#### Dependency Updates

- Update `@actions/core` to v1.2.6 ([a2acc3f](https://github.com/sibiraj-s/action-eslint/commit/a2acc3f))
- Update devDependencies ([b00c5e7](https://github.com/sibiraj-s/action-eslint/commit/b00c5e7))

## v1.0.0 (2020-09-20)

#### Features

- **Initial Release**: Setup ESLint Action
