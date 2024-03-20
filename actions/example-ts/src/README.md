# Example action
<!-- TODO: Update above title to <name> action -->

<!-- TODO: Update below description -->
The example action for doing nothing.

## Usage

<!-- TODO: Update below example configuration -->
```yaml
jobs:
  job:
    runs-on: ubuntu-latest
    steps:
      - uses: kc-workspace/github-actions/example-ts@v1
        with:
          # name: example
          # dryrun: true
```

## Configurations

The configurations can be sent to the action in 2 ways:
[Environment variables][gh-actions-env] or [Input][gh-actions-input]
(The environment will always has priority over `with` fields).

[gh-actions-env]: https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob_idstepsenv
[gh-actions-input]: https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob_idstepswith

### Name

`name` is a printing name (default is **example**).

| Input | Environment | Alternative Environment |
| ----- | ----------- | ----------------------- |
| name  | NAME        | EXAMPLE_TS\_\_NAME      |

### Dryrun

`dryrun` will enabled dry-run mode instead of running actual command.

| Input  | Environment | Alternative Environment |
| ------ | ----------- | ----------------------- |
| dryrun | DRYRUN      | EXAMPLE_TS\_\_DRYRUN    |

## Source code

<!-- TODO: Update below action name -->
> [github-actions-src#action/example-ts][source-code-url]

<!-- TODO: Update below action directory -->
[source-code-url]: https://github.com/kc-workspace/github-actions-src/tree/main/actions/example-ts
