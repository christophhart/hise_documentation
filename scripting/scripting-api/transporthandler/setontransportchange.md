Registers a callback that will be executed as soon as the host playback is being started / stopped.

It expects a function with a single parameter that will contain the transport state as `bool` value.

> This function will also be called once at registration.