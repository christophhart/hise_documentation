Registers a callback that will be executed for every beat. The function must have two parameters:

1.a counter for the current beat index (`int`) 
2. whether the beat is the beginning of a new bar (`bool`)

Be aware that a beat is defined by the denominator of the time signature (so a 6/8 time signature will call this method twice as often as a 3/4 time signature).