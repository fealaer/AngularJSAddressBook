#!/bin/bash
git checkout release
git merge master -q -m "Merge to release"
grunt build
git add dist -fA
git commit -m 'New Build'
git subtree push --prefix dist origin gh-pages
git checkout -