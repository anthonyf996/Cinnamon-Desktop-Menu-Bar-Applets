#!/bin/bash

COLOR_NC="\001\e[0m\002"
COLOR_RED="\001\e[0;31m\002"
COLOR_ORANGE="\001\e[0;33m\002"
COLOR_BLUE="\001\e[0;34m\002"
COLOR_CYAN="\001\e[0;36m\002"
COLOR_LIGHT_CYAN="\001\e[1;36m\002"
COLOR_YELLOW="\001\e[1;33m\002"
COLOR_GREEN="\001\e[0;32m\002"
COLOR_LIGHT_GREEN="\001\e[1;32m\002"
COLOR_LIGHT_PURPLE="\001\e[1;35m\002"

device="wlp3s0"
tunnelLabel="tun0"

if [ $# -lt 2 ]
then
  res="`ifconfig | grep $device`"
  tunnel="`ifconfig | grep $tunnelLabel`"
else
  res=$1
  tunnel=$2
fi

if [ "$tunnel" != "" ]
then
  #printf "$COLOR_CYAN"
  #printf "|| i ||"
  printf "|| ||"
elif [ "$res" == "" ]
then
  #printf "$COLOR_RED"
  #printf "   i   "
  printf "o"
else
  #printf "$COLOR_GREEN"
  printf "(( i ))"
  #printf "i"
fi

#printf "$COLOR_NC"
