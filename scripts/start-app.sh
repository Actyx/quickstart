#!/bin/bash

set -e

command -v ax >/dev/null 2>&1 || { echo >&2 "Error: did not find 'ax'. Did you install the Actyx CLI? Aborting."; exit 1; }
command -v docker >/dev/null 2>&1 || { echo >&2 "Error: did not find 'docker'. Is docker running? Aborting."; exit 1; }

type="unkown"

if [ "$1" = "webview" ]; then
    type="webview"
fi

if [ "$1" = "docker" ]; then
    type="docker"
fi

if [ $type = "unkown" ]; then
    echo >&2 "Error: no or wrong app type '$1' given. Aborting."
    echo >&2 "Usage: ./package-app.sh <webview | docker>"
    exit 1;
fi

if [ $type = "docker" ]; then

    if [[ "$(docker images -q sample-docker-app 2> /dev/null)" == "" ]]; then
        echo >&2 "Error: cannot find 'sample-docker-app' image. Did you run 'npm run build:image' in 'sample-docker-app/'? Aborting."
        exit 1;
    fi
fi

app_id="com.actyx.sample-$type-app"
echo "Starting app '$app_id'"
ax apps start --local $app_id localhost