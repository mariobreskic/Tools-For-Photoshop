// Aliases for Adobe's type ID functions to make code cleaner
var s2t = stringIDToTypeID;
var c2t = charIDToTypeID;

// Create a reference to the active (target) application
var ref = new ActionReference();
ref.putEnumerated(c2t("capp"), c2t("Ordn"), c2t("Trgt")); // capp = "application", Ordn = "ordinal", Trgt = "target"

// Get a descriptor containing application-level information
var appDesc = executeActionGet(ref);

// Get the stringID of the currently active tool (e.g., "paintbrushTool")
var currentTool = typeIDToStringID(appDesc.getEnumerationType(s2t("tool")));

// Proceed only if the current tool is the paintbrush
if (currentTool === "paintbrushTool") {
    // Get the current tool's options as an ActionDescriptor
    var toolOpts = appDesc.getObjectValue(s2t("currentToolOptions"));

    // Retrieve the current flow value (as an integer)
    var currentFlow = toolOpts.getInteger(s2t("flow"));

    // If flow is less than 100%, increase it by 5%, capped at 100%
    if (currentFlow < 100) {
        var newFlow = Math.min(100, currentFlow + 5);

        // Set the new flow value using units in percent
        toolOpts.putUnitDouble(s2t("flow"), s2t("percentUnit"), newFlow);

        // Create a reference to the current tool class for setting updated options
        var setRef = new ActionReference();
        setRef.putClass(s2t(currentTool));

        // Create a descriptor to hold the new settings
        var desc = new ActionDescriptor();
        desc.putReference(s2t("target"), setRef); // Set the "target" of this operation to the current tool
        desc.putObject(s2t("to"), s2t("target"), toolOpts); // Set the tool options

        // Apply the new settings using the 'set' action with no UI dialog
        executeAction(s2t("set"), desc, DialogModes.NO);
    }
}
