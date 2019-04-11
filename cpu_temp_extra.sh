#!/bin/bash

cpuTemp0=$(cat /sys/class/thermal/thermal_zone0/temp)
cpuTemp1=$(($cpuTemp0/1000))
cpuTemp2=$(($cpuTemp0/100))
cpuTempM=$(($cpuTemp2 % $cpuTemp1))

tempC="$cpuTemp1.$cpuTempM'C"
tempF="$(( $(( $(( $(( $(( $cpuTemp1 * 10 )) + $cpuTempM )) * 18 )) / 100 )) + 32 ))'F"

if [ "$1" == "-F" ]
then
  printf "$tempC"
else
  printf "$tempF"
fi
