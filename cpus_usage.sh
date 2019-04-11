#!/bin/bash

p0a=`cat /proc/stat | grep 'cpu0'`
p1a=`cat /proc/stat | grep 'cpu1'`
p2a=`cat /proc/stat | grep 'cpu2'`
p3a=`cat /proc/stat | grep 'cpu3'`
sleep 1
p0b=`cat /proc/stat | grep 'cpu0'`
p1b=`cat /proc/stat | grep 'cpu1'`
p2b=`cat /proc/stat | grep 'cpu2'`
p3b=`cat /proc/stat | grep 'cpu3'`

p0=`cat <(echo $p0a) <(echo $p0b) | awk -v RS="" '{printf "%.2f%\n", ($13-$2+$15-$4)*100/($13-$2+$15-$4+$16-$5)}'`
p1=`cat <(echo $p1a) <(echo $p1b) | awk -v RS="" '{printf "%.2f%\n", ($13-$2+$15-$4)*100/($13-$2+$15-$4+$16-$5)}'`
p2=`cat <(echo $p2a) <(echo $p2b) | awk -v RS="" '{printf "%.2f%\n", ($13-$2+$15-$4)*100/($13-$2+$15-$4+$16-$5)}'`
p3=`cat <(echo $p3a) <(echo $p3b) | awk -v RS="" '{printf "%.2f%\n", ($13-$2+$15-$4)*100/($13-$2+$15-$4+$16-$5)}'`

echo "$p0 $p1 $p2 $p3"
