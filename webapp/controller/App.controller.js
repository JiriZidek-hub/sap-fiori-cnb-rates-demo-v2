sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox"
], function (Controller, JSONModel, MessageBox) {
    "use strict";

    return Controller.extend("demo.cnb.controller.App", {
        onInit: function () {
            this.loadRates();
        },

        loadRates: function () {
            var that = this;

            fetch("https://www.cnb.cz/cs/financni-trhy/devizovy-trh/kurzy-devizoveho-trhu/denni_kurz.xml")
                .then(function (response) {
                    if (!response.ok) {
                        throw new Error("HTTP error: " + response.status);
                    }
                    return response.text();
                })
                .then(function (xmlText) {
                    var parser = new DOMParser();
                    var xml = parser.parseFromString(xmlText, "application/xml");
                    var rows = xml.querySelectorAll("radek");
                    var aRates = [];

                    rows.forEach(function (row) {
                        var code = row.getAttribute("kod");
                        var name = row.getAttribute("mena");
                        var amount = row.getAttribute("mnozstvi");
                        var rate = row.getAttribute("kurz");

                        if (code && name && amount && rate) {
                            aRates.push({
                                code: code,
                                name: name,
                                amount: amount,
                                rate: parseFloat(rate.replace(",", ".")),
                                result: ""
                            });
                        }
                    });

                    if (!aRates.length) {
                        throw new Error("No rates returned from ČNB");
                    }

                    var oModel = new JSONModel({ rates: aRates });
                    that.getView().setModel(oModel);
                    that.onConvert();
                })
                .catch(function (oError) {
                    console.error(oError);
                    MessageBox.error("Nepodařilo se načíst data z ČNB.");
                });
        },

        onConvert: function () {
            var oModel = this.getView().getModel();
            if (!oModel) {
                return;
            }

            var aRates = oModel.getData().rates || [];
            var amount = parseFloat(this.byId("amountInput").getValue()) || 0;

            aRates.forEach(function (item) {
                if (item.rate && item.amount) {
                    item.result = ((amount / item.rate) * item.amount).toFixed(2);
                } else {
                    item.result = "";
                }
            });

            oModel.setData({ rates: aRates });
        }
    });
});
