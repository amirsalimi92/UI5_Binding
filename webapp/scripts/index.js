console.log("test");

sap.ui.require(
  ["sap/ui/model/json/JSONModel", "sap/m/Text"],
  function (JSONModel, Text) {
    "use strict";

    // Attach an anonymous function to the SAPUI5 'init' event

    // this.getView().getModel() -> another way to define
    sap.ui.getCore().attachInit(function () {
      // Create a json model from an object literal
      // const oModel = new JSONModel({
      //   greetingText: "Hi my name is Amir from json",
      // });

      const oModel = new JSONModel();
      oModel.loadData("./model/test.json");

      sap.ui.getCore().setModel(oModel);
      // this.getView().setModel(oMOdel)  -> another way to define the model

      // Create a text UI element that displays a hardcoded text string
      // new Text({
      //   text: "Hi my name is Amir from text",
      // }).placeAt("content");

      // Display a Text element whose text is from the model object
      new Text({
        text: "{/greetingText}",
      }).placeAt("content");
    });
  }
);
