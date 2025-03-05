This function can be used to enable / disable the release start feature of a sampler.

You can either disable / enable it for each event by supplying a currently active event ID or globally by passing in `-1` as event ID. Using it on a per event basis allows you to eg. deactivate the release skip when you're implementing a custom logic (eg. legato intervals).

The function returns true if it has found the provided event ID so you can verify that your script works as intended. It is safe (and recommended) to call this in the noteOff callback and it will be picked up correctly by the given sampler.