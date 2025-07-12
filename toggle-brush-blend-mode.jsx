function toggleBrushBlendMode() {
    try {
        // Reference the brush tool options
        var ref = new ActionReference();
        ref.putProperty(charIDToTypeID("Prpr"), stringIDToTypeID("tool"));
        ref.putEnumerated(charIDToTypeID("capp"), charIDToTypeID("Ordn"), charIDToTypeID("Trgt"));

        var toolDesc = executeActionGet(ref);
        if (!toolDesc.hasKey(stringIDToTypeID("currentToolOptions"))) {
            throw new Error("No currentToolOptions found.");
        }

        var options = toolDesc.getObjectValue(stringIDToTypeID("currentToolOptions"));
        var currentBlendMode = options.getEnumerationValue(stringIDToTypeID("mode"));
        var currentModeStr = typeIDToStringID(currentBlendMode);

        // Decide on the new mode
        var newMode = (currentModeStr === "normal") ? "multiply" : "normal";

        // Set the brush tool options with new blend mode
        var desc = new ActionDescriptor();
        var toolRef = new ActionReference();
        toolRef.putClass(stringIDToTypeID("paintbrushTool"));
        desc.putReference(charIDToTypeID("null"), toolRef);

        var optionsDesc = new ActionDescriptor();
        optionsDesc.putEnumerated(stringIDToTypeID("mode"), stringIDToTypeID("blendMode"), stringIDToTypeID(newMode));
        desc.putObject(charIDToTypeID("T   "), stringIDToTypeID("paintbrushTool"), optionsDesc);

        executeAction(charIDToTypeID("setd"), desc, DialogModes.NO);
    } catch (e) {
        alert("Error: " + e.message);
    }
}

toggleBrushBlendMode();
