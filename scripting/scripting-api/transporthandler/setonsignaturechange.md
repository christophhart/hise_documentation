Registers a callback that will be executed as soon as the time signature changes. It expects a function with two parameters:

1. Nominator
2. Denominator

So for a 6/8 time signature, the first parameter will be 6 and the second one will be 8.

> The callback you supply here is also executed once at registration (so that it will pick up the current time signature).