sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/m/library",
    "sap/ui/core/Locale",
    "sap/ui/core/LocaleData",
    "sap/ui/model/type/Currency",
  ],
  function (Controller, library, Locale, LocaleData, Currency) {
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

      formatStockValue: function (fUnitPrice, iStockLevel, sCurrCode) {
        const sBrowserLocale = sap.ui
          .getCore()
          .getConfiguration()
          .getLanguage();

        const oLocale = new Locale(sBrowserLocale);
        const oLocaleData = new LocaleData(oLocale);
        const oCurrency = new Currency(oLocaleData.mData.currencyFormat);

        return oCurrency.formatValue(
          [fUnitPrice * iStockLevel, sCurrCode],
          "string"
        );
      },

      onItemSelected: function (oEvent) {
        const oSelecteditem = oEvent.getSource();
        const oContext = oSelecteditem.getBindingContext("products");
        const sPath = oContext.getPath();
        // Set Id from View in Panel
        const oProductDetailPanel = this.byId("productDetailsPanel");
        oProductDetailPanel.bindElement({ path: sPath, model: "products" });
      },
    });
  }
);
