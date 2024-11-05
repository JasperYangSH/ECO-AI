sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	'sap/ui/model/Sorter',
	'sap/m/MessageBox'
], function (JSONModel, Controller, Filter, FilterOperator, Sorter, MessageBox) {
	"use strict";

	return Controller.extend("chatui.controller.List", {
		onInit: function () {
			this.oRouter = this.getOwnerComponent().getRouter();
			this._bDescendingSort = false;
		},
		onListItemPress: function (oEvent) {
			// var oNextUIState = this.getOwnerComponent().getHelper().getNextUIState(1),
			var oItem = oEvent.getSource().getSelectedItem();
			if (oItem) {

				var NoticesPath = oEvent.getSource().getSelectedItem().getBindingContext("maintnot").getPath();
				var Notices = NoticesPath.split("/").slice(-1).pop();
				// var Notices = oItem.getBindingContext("maintnot").getProperty("ID");
				this.oRouter.navTo("detail", { maintnotID: Notices });

			}
			// NoticesPath = oEvent.getSource().getSelectedItem().getBindingContext("Notices").getPath(),
			// Notices = NoticesPath.split("/").slice(-1).pop();

			// this.oRouter.navTo("detail", {maintnotID: Notices});
		},
		onSearch: function (oEvent) {
			var oTableSearchState = [],
				sQuery = oEvent.getParameter("query");

			if (sQuery && sQuery.length > 0) {
				oTableSearchState = [new Filter("equipment", FilterOperator.Contains, sQuery)];
			}

			this.getView().byId("productsTable").getBinding("items").filter(oTableSearchState, "Application");
		},

		onAdd: function (oEvent) {
			this.oRouter.navTo("newEntry");
		},

		onSort: function (oEvent) {
			this._bDescendingSort = !this._bDescendingSort;
			var oView = this.getView(),
				oTable = oView.byId("productsTable"),
				oBinding = oTable.getBinding("items"),
				oSorter = new Sorter("equipment", this._bDescendingSort);

			oBinding.sort(oSorter);
		}
	});
});
