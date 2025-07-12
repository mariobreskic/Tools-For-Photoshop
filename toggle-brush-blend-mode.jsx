function toggleBrushBlendMode() {
    try {
        // Create a reference to the 'tool' property of the application (the currently active tool)
        var ref = new ActionReference();
        ref.putProperty(charIDToTypeID("Prpr"), stringIDToTypeID("tool"));  // 'Prpr' = property
        ref.putEnumerated(charIDToTypeID("capp"), charIDToTypeID("Ordn"), charIDToTypeID("Trgt")); // 'capp' = application, 'Ordn' = ordinal, 'Trgt' = target

        // Get a descriptor containing the current tool's information
        var toolDesc = executeActionGet(ref);

        // Ensure that 'currentToolOptions' exists for this tool, otherwise throw an error
        if (!toolDesc.hasKey(stringIDToTypeID("currentToolOptions"))) {
            throw new Error("No currentToolOptions found.");
        }

        // Get the current tool options as an ActionDescriptor
        var options = toolDesc.getObjectValue(stringIDToTypeID("currentToolOptions"));

        // Retrieve the current brush blend mode as an enumeration value
        var currentBlendMode = options.getEnumerationValue(stringIDToTypeID("mode"));

        // Convert the enumeration typeID to a human-readable string, e.g., "normal", "multiply"
        var currentModeStr = typeIDToStringID(currentBlendMode);

        // Determine the new blend mode: toggle between "normal" and "multiply"
        var newMode = (currentModeStr === "normal") ? "multiply" : "normal";

        // Prepare a descriptor to set the new blend mode for the paintbrush tool
        var desc = new ActionDescriptor();

        // Create a reference targeting the paintbrush tool class
        var toolRef = new ActionReference();
        toolRef.putClass(stringIDToTypeID("paintbrushTool"));

        // Set this reference as the target of the 'set' action ('null' property)
        desc.putReference(charIDToTypeID("null"), toolRef);

        // Create a descriptor for the new paintbrush tool options
        var optionsDesc = new ActionDescriptor();

        // Set the 'mode' property to the new blend mode (blendMode type)
        optionsDesc.putEnumerated(stringIDToTypeID("mode"), stringIDToTypeID("blendMode"), stringIDToTypeID(newMode));

        // Attach the new options descriptor to the main descriptor, targeting the paintbrushTool
        desc.putObject(charIDToTypeID("T   "), stringIDToTypeID("paintbrushTool"), optionsDesc);

        // Execute the 'set' action ('setd' = set descriptor) to apply the new blend mode silently (no dialog)
        executeAction(charIDToTypeID("setd"), desc, DialogModes.NO);
    } catch (e) {
        // If any error occurs, alert the user with the error message
        alert("Error: " + e.message);
    }
}

// Run the toggle function immediately
toggleBrushBlendMode();
