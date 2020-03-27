#!/bin/bash

set -e

command -v docker >/dev/null 2>&1 || { echo >&2 "Error: did not find 'docker'. Is docker running? Aborting."; exit 1; }

this_dir=$(dirname "$0")

echo "Cleaning up..."
echo " > Deleting packaged apps."
rm -f "$this_dir/../sample-docker-app/com.actyx.sample-docker-app-1.0.0.tar.gz"
rm -f "$this_dir/../sample-webview-app/com.actyx.sample-webview-app-1.0.0.tar.gz"
echo " > Deleting sample docker image."
docker image rm -f sample-docker-app 2>/dev/null >/dev/null
echo "Done."
exit 0