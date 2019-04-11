#!/bin/bash

defaultDirRegex="\/$"
defaultLabel="/"

targetRegex="$defaultDirRegex"
targetLabel="$defaultLabel"

### Change target dir here ###

dir="/home/user/Documents"
dirRegex="^\/home\/user\/Documents"
label="Documents"

################################################

# If target directory does not exist, use default
if [ -e $dir ];
then
  targetRegex="$dirRegex"
  targetLabel="$label"
fi

# Get usage percentage
usage=`df -h | awk "/$targetRegex/"' {print $5}'`

echo "$targetLabel: $usage"
