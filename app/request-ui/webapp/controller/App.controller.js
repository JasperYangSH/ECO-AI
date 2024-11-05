sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
function (Controller) {
    "use strict";

    return Controller.extend("requestui.controller.App", {
        onInit: function () {
            sessionStorage.setItem("isDeployedVersion", "false");
        }
    });
});
