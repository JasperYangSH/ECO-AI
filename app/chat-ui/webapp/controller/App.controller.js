sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
function (Controller) {
    "use strict";

    return Controller.extend("chatui.controller.App", {
        onInit: function() {
            sessionStorage.setItem("isDeployedVersion", "false");
        }
    });
});
