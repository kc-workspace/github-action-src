# Set up asdf action

Set up asdf and install tools based on .tool-versions file

## Usage

```yaml
jobs:
  job:
    runs-on: ubuntu-latest
    steps:
      - uses: cognius/github-actions/setup-asdf@v3
        with:
          # ref: v0.13.1
          # tool-install: false
          # workdir: /
          # cache-disabled: false
          # cache-key: v1
          # dryrun: true
```

## Configurations

A parsed input send to actions. You have 2 options to configure a value:

1. using [with][steps-with-url] field. (This should be `kebab-case`)
2. using [env][steps-env-url] field. (This should be `UPPER_CASE` and prefix with application name and `__`)
   - Example: `EXAMPLE_TS__NAME`

[steps-with-url]: https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob_idstepswith
[steps-env-url]: https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob_idstepsenv

### Reference

`ref` is a reference of asdf repository (default is **master**).

| Input | Environment | Alternative Environment |
| ----- | ----------- | ----------------------- |
| ref   | REF         | SETUP_ASDF\_\_REF       |

### Tool install mode

`tool-install` is a boolean flag to install tools listed
on .tool-versions file (default is **false**).

| Input        | Environment  | Alternative Environment    |
| ------------ | ------------ | -------------------------- |
| tool-install | TOOL_INSTALL | SETUP_ASDF\_\_TOOL_INSTALL |

### Work directory

`workdir` is a current working directory,
this also use to resolve .tool-versions file when
you enabled [tool-install](#tool-install-mode) mode (default is **$PWD**).

| Input   | Environment | Alternative Environment |
| ------- | ----------- | ----------------------- |
| workdir | WORKDIR     | SETUP_ASDF\_\_WORKDIR   |

### Cache disabled

`cache-disabled` is a boolean flag to disabled caching on GitHub Action
(default is **false**).

| Input          | Environment    | Alternative Environment      |
| -------------- | -------------- | ---------------------------- |
| cache-disabled | CACHE_DISABLED | SETUP_ASDF\_\_CACHE_DISABLED |

### Cache key

`cache-key` is a optional key for resolving cache in Github Action.

| Input     | Environment | Alternative Environment |
| --------- | ----------- | ----------------------- |
| cache-key | CACHE_KEY   | SETUP_ASDF\_\_CACHE_KEY |

### Dryrun

`dryrun` will enabled dry-run mode instead of running actual command.

| Input  | Environment | Alternative Environment |
| ------ | ----------- | ----------------------- |
| dryrun | DRYRUN      | SETUP_ASDF\_\_DRYRUN    |

## Source code

> [github-actions-private#action/setup-asdf][source-code-url]

If you cannot open source code, meaning you don't have permission to open it.

[source-code-url]: https://github.com/cognius/github-actions-private/tree/main/actions/src/setup-asdf
