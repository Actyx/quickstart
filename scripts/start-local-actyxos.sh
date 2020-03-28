#!/bin/bash

docker run \
    -it \
    --rm \
    -e AX_DEV_MODE=1 \
    -v actyxos-data-3:/data \
    --privileged \
    -p 4001:4001 \
    -p 4457:4457 \
    -p 5001:5001 \
    -p 4243:4243 \
    -p 4454:4454 \
    -p 9999:9999 \
    actyx/cosmos:actyxos-x64-a0636ccb9e3678c67d05599ca7f4d8f20fa2620e