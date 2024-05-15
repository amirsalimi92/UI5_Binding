console.log("test");

sap.ui.require(["sap/m/Text"], function (Text) {
  "use strict";

  // Attach an anonymous function to the SAPUI5 'init' event

  // this.getView().getModel()
  sap.ui.getCore().attachInit(function () {
    // Create a text UI element that displays a hardcoded text string
    new Text({
      text: "Hi my name is Amir",
    }).placeAt("content");
  });
});
