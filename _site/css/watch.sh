#!/bin/sh

# Change all instances of ‘csswizardry’ to whatever you have named your
# project’s stylesheet, `cd` to the directory in which this file lives and
# simply run `sh watch.sh`.

# No minification
#sass --watch csswizardry.scss:csswizardry.css --style expanded

sass --watch csswizardry.scss:csswizardry.min.css --style compressed

exit 0
