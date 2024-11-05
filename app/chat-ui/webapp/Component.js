/**
 * eslint-disable @sap/ui5-jsdocs/no-jsdoc
 */

sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
    "sap/ui/Device",
    "chatui/model/models"
],
    function (UIComponent, JSONModel, Device, models) {
        "use strict";

        return UIComponent.extend("chatui.Component", {
            metadata: {
                manifest: "json"
            },

            /**
             * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
             * @public
             * @override
             */
            init: function () {
                // call the base component's init function
                UIComponent.prototype.init.apply(this, arguments);

                // enable routing
                this.getRouter().initialize();

                // set the device model
                this.setModel(models.createDeviceModel(), "device");

                //
                var oModel = new JSONModel();
                this.setModel(oModel,"view");
            },
            /**
             * Returns an instance of the semantic helper
             * @returns {sap.f.FlexibleColumnLayoutSemanticHelper} An instance of the semantic helper
             */
            getHelper: function () {
                var oFCL = this.getRootControl().byId("flexibleColumnLayout"),
                    oParams = new URLSearchParams(window.location.search),
                    oSettings = {
                        defaultTwoColumnLayoutType: LayoutType.TwoColumnsMidExpanded,
                        defaultThreeColumnLayoutType: LayoutType.ThreeColumnsMidExpanded,
                        initialColumnsCount: 2,
                        maxColumnsCount: oParams.get("max")
                    };

                return FlexibleColumnLayoutSemanticHelper.getInstanceFor(oFCL, oSettings);
            }
        });
    }
);