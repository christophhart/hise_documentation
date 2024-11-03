---
keywords: LockfreeQueue
summary:   C++ API Class reference
author:   Christoph Hart
---

A wrapper around moodycamels ReaderWriterQueue with more JUCE like interface and some assertions.   
classElementTypeElementType
## Class methods

### pop

```cpp
bool pop(ElementType &newElement)
```

Removes an element and returns false if the queue is empty.   

### push

```cpp
bool push(const ElementType &newElement)
```

Adds an element to the queue. If it fails because the queue is full, it throws an assertion and return false.   

### callForEveryElementInQueue

```cpp
bool callForEveryElementInQueue(const ElementFunction &f)
```

Iterates over the queue, calls the given function for every element and removes it.   

### callEveryElementInQueue

```cpp
bool callEveryElementInQueue()
```

If the type of the queue is callable, this will call all functions in the queue.   
