By default, the broadcaster will not send a message when one or more arguments are undefined. This prevents wrong initialisation calls and script errors when the arguments are passed into function calls.

If you want to disable that function and also send messages for undefined arguments, call this function to change that behaviour (but in that case make sure to check `isDefined()` before passing the parameters into function calls to avoid script errors).

> If you create a broadcaster, all the arguments will have an `undefined` state until you send the first message.