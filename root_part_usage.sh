#!/bin/bash

usage=`df -h | awk '/\/$/ {print $5}'`

echo $usage
