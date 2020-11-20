# ActyxOS Quickstart Guide Samples

This repository is the source code companion to the [ActyxOS Quickstart Guide](https://developer.actyx.com/docs/learn-actyx/quickstart/), check it out!

The Docker sample contains provisions for building an `arm64` image and corresponding ActyxOS app package, see `ax-manifest-all.yml`.
In order to use this, you’ll need to install and activate the experimental [Docker buildx](https://docs.docker.com/buildx/working-with-buildx/) feature (requires at least Docker 19.03).
If you are building on Linux, you’ll also need to install the `qemu-user-static` package and make sure to restart the docker daemon afterwards.
