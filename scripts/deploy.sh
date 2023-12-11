#!/usr/bin/env bash

set -e

cd "$(dirname "$0")/.." || exit 1

_ROOT=$PWD

_GH_ACTIONS="${ACTIONS_TARGET_DIRECTORY:?}"
_GH_WORKFLOW="$_GH_ACTIONS/.github/workflows"

error() {
  # shellcheck disable=SC2059
  printf "$@"
  exit 1
}

! command -v pnpm && error "command 'pnpm' is missing"

## Build actions
cd actions && pnpm build

! test -d "$_GH_WORKFLOW" && mkdir -p "$_GH_WORKFLOW"

## Copy workflows and resources
cp -r "$_ROOT/workflows"/** "$_GH_WORKFLOW"
cp -r "$_ROOT/resources"/** "$_GH_ACTIONS"

cd "$_ROOT/$_GH_ACTIONS" || exit 1
printf 'move to '%s'' "$PWD"

git status
## Deployment only if file changes
if ! git diff --exit-code --quiet; then
  git config --local user.name "$ACTIONS_COMMIT_NAME"
  git config --local user.email "$ACTIONS_COMMIT_EMAIL"

  git add -A
  git commit -m "$ACTIONS_COMMIT_MSG"
  git push origin "$ACTIONS_TARGET_BRANCH"
fi
