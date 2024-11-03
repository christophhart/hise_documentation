---
keywords: Table
summary:   C++ API Class reference
author:   Christoph Hart
---

A table is a data structure that allows editing of a look up table with a TableEditor. It uses a list of graph points to create a path which is rendered to a float array of the desired size.   
## Class Hierarchy

### Base Classes

- `hise::SafeChangeBroadcaster`  

### Derived Classes

- `hise::DiscreteTable`  
- `hise::MidiTable`  
- `hise::SampleLookupTable`  


## Public types
### enum DataType
| Name | Description |
| -- | ------ |
| `Midi` | in this mode, the table contains 128 elements and can be used for everything midi-related. |
| `SampleLookupTable` | in this mode, the table contains 2048 elements and can be used for holding everything sample-related (waveforms, envelopes, etc.) |

## Class methods

### Table

```cpp
 Table()
```

Creates a new table of the specified type.   

### getTableSize

```cpp
int getTableSize() const =0
```

Overwrite this and return the table size.   

### setGraphPoints

```cpp
void setGraphPoints(const Array< GraphPoint > &newGraphPoints, int numPoints)
```

Sets the GraphPoints. If you need to refresh the internal table, you also have to call [fillLookUpTable()](/cpp_api/hise/classhise_1_1_table#filllookuptable).   

### exportData

```cpp
String exportData() const
```

Exports the data as base64 encoded String. This is not a ValueTree (so RestorableObject is no base class from Table), because it needs to be embedded in an XML attribute  
[restoreData()](/cpp_api/hise/classhise_1_1_table#restoredata)  
  

### restoreData

```cpp
void restoreData(const String &savedString)
```

Restores the data from a base64 encoded String.  
[exportData()](/cpp_api/hise/classhise_1_1_table#exportdata)  
  

### getNumGraphPoints

```cpp
int getNumGraphPoints() const
```

Returns the number of graph points   

### getGraphPoint

```cpp
GraphPoint getGraphPoint(int pointIndex) const
```

Get a copy of the graph point at pointIndex.   

### createPath

```cpp
void createPath(Path &normalizedPath) const
```

This generates a normalized path from the GraphPoint array.  
This is called by the editor to draw the path under the DragPoints.   

### fillLookUpTable

```cpp
void fillLookUpTable()
```

Fills the look up table with the graph points generated from calculateGraphPoints()  
Don't call this too often as it is quite heavy!   

### getWritePointer

```cpp
float * getWritePointer()=0
```

Overwrite this and return a pointer to the data array.   

### getXValueText

```cpp
String getXValueText(float value)
```

This returns a String that can be used for displaying purposes.  
You can supply a lambda for the conversion using setTextConverter().   
