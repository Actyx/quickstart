#!/bin/bash

set -e

command -v docker >/dev/null 2>&1 || { echo >&2 "Error: did not find 'docker'. Is docker running? Aborting."; exit 1; }

docker run -it --rm -e AX_DEV_MODE=1 -v actyxos_data:/data --privileged -p 4001:4001 -p 4457:4457 -p 4243:4243 -p 4454:4454 actyx/os