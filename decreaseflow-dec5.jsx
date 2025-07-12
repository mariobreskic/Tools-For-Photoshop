// decrease flow value by 5
// shoutout to c.pfaffenbichler on the Adobe community forums, adapted from his own script
var ref = new ActionReference();
ref.putEnumerated(charIDToTypeID("capp"), charIDToTypeID("Ordn"), charIDToTypeID("Trgt"));
var applicationDesc = executeActionGet(ref);
var theTool = typeIDToStringID(applicationDesc.getEnumerationType(stringIDToTypeID("tool")));
if (theTool == "paintbrushTool") {
    var theCurrentToolOptions = applicationDesc.getObjectValue(stringIDToTypeID("currentToolOptions"));
    var theFlow = theCurrentToolOptions.getInteger(stringIDToTypeID("flow"));
    setBrushToolFlow(Math.max(1, theFlow - 5));
};

function setBrushToolFlow(theFlow) {
    (r = new ActionReference()).putProperty(stringIDToTypeID('property'), p = stringIDToTypeID('currentToolOptions'));
    r.putEnumerated(stringIDToTypeID('application'), stringIDToTypeID('ordinal'), stringIDToTypeID('targetEnum'));
    var tool = executeActionGet(r).getObjectValue(p);
    if (tool.hasKey(stringIDToTypeID('brush'))) {
        tool.putUnitDouble(stringIDToTypeID("flow"), stringIDToTypeID("percentUnit"), theFlow);
        (r = new ActionReference()).putClass(stringIDToTypeID(theTool));
        (d = new ActionDescriptor()).putReference(stringIDToTypeID("target"), r);
        d.putObject(stringIDToTypeID("to"), stringIDToTypeID("target"), tool);
        executeAction(stringIDToTypeID("set"), d, DialogModes.NO);
    };
};