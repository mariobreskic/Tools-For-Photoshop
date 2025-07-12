var s2t = stringIDToTypeID;
var c2t = charIDToTypeID;

var ref = new ActionReference();
ref.putEnumerated(c2t("capp"), c2t("Ordn"), c2t("Trgt"));
var appDesc = executeActionGet(ref);

var currentTool = typeIDToStringID(appDesc.getEnumerationType(s2t("tool")));

if (currentTool === "paintbrushTool") {
    var toolOpts = appDesc.getObjectValue(s2t("currentToolOptions"));
    var currentFlow = toolOpts.getInteger(s2t("flow"));

    if (currentFlow < 100) {
        var newFlow = Math.min(100, currentFlow + 5);
        toolOpts.putUnitDouble(s2t("flow"), s2t("percentUnit"), newFlow);

        var setRef = new ActionReference();
        setRef.putClass(s2t(currentTool));

        var desc = new ActionDescriptor();
        desc.putReference(s2t("target"), setRef);
        desc.putObject(s2t("to"), s2t("target"), toolOpts);

        executeAction(s2t("set"), desc, DialogModes.NO);
    }
}
