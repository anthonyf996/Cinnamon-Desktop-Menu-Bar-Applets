#!/bin/bash

if [ $# == 1 ]
then
  if [ "$1" == "-T" ]
  then
    col="\$2"
  elif [ "$1" == "-U" ]
  then
    col="\$3"
  elif [ "$1" == "-F" ]
  then
    col="\$4"
  elif [ "$1" == "-S" ]
  then
    col="\$5"
  elif [ "$1" == "-B" ]
  then
    col="\$6"
  elif [ "$1" == "-A" ]
  then
    col="\$7"
  else
    col="\$6"
  fi
else
  col="\$1"
fi

totalCol="\$2"
mem=`free | awk "/^Mem:/ {print $col}"`
total=`free | awk "/^Mem:/ {print $totalCol}"`
temp1=$(( $mem * 1000 / $total ))
temp2=$(( $mem * 100 / $total ))
mantissa=$(( $temp1 % $temp2 ))

echo "$temp2.$mantissa %"
