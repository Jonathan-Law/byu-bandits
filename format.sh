#!/bin/sh

if [ -z "$1" ]; then
  files=$(find react-ui/src -type f | grep -E "\.(ts|js|css|tsx)\$")
else
  files="$@"
fi

prettier --write $files --config ./.prettierrc

if [ -z "$1" ]; then
  files=$(find server -type f | grep -E "\.(ts|js|css|tsx)\$")
else
  files="$@"
fi

prettier --write $files --config ./.prettierrc