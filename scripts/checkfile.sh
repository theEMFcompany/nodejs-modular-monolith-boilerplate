#!/bin/bash
FILE=$1

if test -f "$FILE"; then
    make "$FILE"
	echo "compiling changes to: $FILE"
else 
	DIST_FILE=$(echo "${FILE/src/dist}")
	echo "removing $DIST_FILE"
	rm -rf "$DIST_FILE"
fi