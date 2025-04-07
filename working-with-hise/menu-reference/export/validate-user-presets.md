Before exporting your plugin, you can use this function in in order to run a series of **sanity checks** to ensure your plugin parameters are properly configured:

- No duplicate parameter indices,
- No illegal parameter names or duplicate IDs
- All parameters with the `isPluginParameter` have a non empty `pluginParameterName` property
- All parameters that change other plugin parameters have the `isMetaParameter` flag set

This function will also print a report to the console so you can quickly inspect the list of plugin parameters. Note that for a proper testing / development experience it's recommended to use the [PluginParameterSimulator](/ui-components/floating-tiles/hise/pluginparametersimulator) floating tile.
