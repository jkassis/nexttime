#!/bin/bash
./node_modules/typescript/bin/tsc
./node_modules/mocha/bin/_mocha -u bdd --timeout 999999 --colors ./dist/test/code/Main.test.js