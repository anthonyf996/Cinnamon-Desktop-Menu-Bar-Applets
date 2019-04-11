#!/bin/bash

usage=`cat <(grep 'cpu ' /proc/stat) <(sleep 1 && grep 'cpu ' /proc/stat) | awk -v RS="" '{printf "%.2f%\n", ($13-$2+$15-$4)*100/($13-$2+$15-$4+$16-$5)}'`

echo $usage

