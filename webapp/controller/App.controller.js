sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/m/library"],
  function (Controller, library) {
    "use strict";

    return Controller.extend("myapp.controller.App", {
      formatMail: function (sFirstName, sLastName) {
        const oBundle = this.getView().getModel("i18n").getResourceBundle();

        return library.URLHelper.normalizeEmail(
          sFirstName + "." + sLastName + "@example.com",
          oBundle.getText("mailSubject", [sFirstName]),
          oBundle.getText("mailBody")
        );
      },
    });
  }
);
