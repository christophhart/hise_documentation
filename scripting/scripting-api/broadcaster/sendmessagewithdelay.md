This will send out a message after a certain delay so it might come in handy in scenarios where you previously had to drag a timer around.

Be aware that if you call this method while a callback is pending, it will override the value to be send out and restart the timer, so the first message might get lost.