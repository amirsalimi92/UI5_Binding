sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/m/library",
    "sap/ui/core/Locale",
    "sap/ui/core/LocaleData",
    "sap/ui/model/type/Currency",
    "sap/m/ObjectAttribute",
  ],
  function (
    Controller,
    library,
    Locale,
    LocaleData,
    Currency,
    ObjectAttribute
  ) {
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

      productListFactory: function (sId, oContext) {
        let oUIControl;

        // Decide based on the data which dependent to clone
        if (
          oContext.getProperty("UnitInStock") === 0 &&
          oContext.getProperty("Discontinued")
        ) {
          // The item is discontinued, so use a StandardListItem
          oUIControl = this.byId("productSimple").clone(sId);
        } else {
          // The item is available, so we will create an ObjectListItem
          oUIControl = this.byId("productExtended").clone(sId);

          // the item is temporarily out of stock, so we will add a ststus
          if (oContext.getProperty("UnitsInStock") < 1) {
            oUIControl.addAttribute(
              new ObjectAttribute({
                text: {
                  path: "i18n>outOfStock",
                },
              })
            );
          }
        }

        return oUIControl;
      },
    });
  }
);
