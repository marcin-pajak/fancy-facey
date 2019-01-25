#!/bin/bash
set -e
set -o pipefail

rm -rf dist
yarn test
yarn build

firebase deploy --project fancy-facey