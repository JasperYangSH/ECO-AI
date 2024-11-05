sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/mvc/Controller"
], function (JSONModel, Controller) {
	"use strict";

	return Controller.extend("chatui.controller.Detail", {
		onInit: function () {
			var oExitButton = this.getView().byId("exitFullScreenBtn"),
				oEnterButton = this.getView().byId("enterFullScreenBtn");

			this.oRouter = this.getOwnerComponent().getRouter();
			this.oModel = this.getOwnerComponent().getModel("view");
			this.oMaintModel = this.getOwnerComponent().getModel("maintnot");
			this.getView().setModel(this.oMaintModel,"maintnot");

			this.oRouter.getRoute("newEntry").attachPatternMatched(this._onMaintMatched, this);
			this.oRouter.getRoute("detail").attachPatternMatched(this._onMaintMatched, this);
			this.oRouter.getRoute("newChat").attachPatternMatched(this._onMaintMatched, this);
			this.oRouter.getRoute("conversation").attachPatternMatched(this._onMaintMatched, this);

			// [oExitButton, oEnterButton].forEach(function (oButton) {
			// 	oButton.addEventDelegate({
			// 		onAfterRendering: function () {
			// 			if (this.bFocusFullScreenButton) {
			// 				this.bFocusFullScreenButton = false;
			// 				oButton.focus();
			// 			}
			// 		}.bind(this)
			// 	});
			// }, this);
		},
		onChat:function (oEvent) {
			var sConversion = this.getView().getBindingContext("maintnot").getProperty("cID");
			sConversion="ad297f05-543e-48c7-a0ee-109e78271abd";
			if (sConversion){
				this.oRouter.navTo("conversation", { "maintnotID" : this._maintnot ,"conversationID" : sConversion });
			}
			else{
				this.oRouter.navTo("newChat", { "maintnotID" : this._maintnot });
			}	

		},
		onSave:function (oEvent) {
			this.oRouter.navTo("home");
		},
		onCancel:function (oEvent) {
			this.oRouter.navTo("home");
		},
		handleItemPress: function (oEvent) {
			var //oNextUIState = this.getOwnerComponent().getHelper().getNextUIState(2),
				supplierPath = oEvent.getSource().getSelectedItem().getBindingContext("products").getPath(),
				supplier = supplierPath.split("/").slice(-1).pop();

			this.oRouter.navTo("detailDetail", {layout: oNextUIState.layout,
				product: this._product, supplier: supplier});
		},
		handleFullScreen: function () {
			this.bFocusFullScreenButton = true;
			var sNextLayout = this.oModel.getProperty("/actionButtonsInfo/midColumn/fullScreen");
			this.oRouter.navTo("detail", {layout: sNextLayout, product: this._product});
		},
		handleExitFullScreen: function () {
			this.bFocusFullScreenButton = true;
			var sNextLayout = this.oModel.getProperty("/actionButtonsInfo/midColumn/exitFullScreen");
			this.oRouter.navTo("detail", {layout: sNextLayout, product: this._product});
		},
		handleClose: function () {
			var sNextLayout = this.oModel.getProperty("/actionButtonsInfo/midColumn/closeColumn");
			this.oRouter.navTo("list", {layout: sNextLayout});
		},

        getBaseURL: function () {

            var appId = this.getOwnerComponent().getManifestEntry("/sap.app/id");
            var appPath = appId.replaceAll(".", "/");
            var appModulePath = jQuery.sap.getModulePath(appPath);

            return appModulePath;
        },

		onFileChange: function(oEvent) {
            debugger
            var imageFiles = oEvent.getParameter("files");   
            if (imageFiles && imageFiles.length) {       
                var oFile = imageFiles[0];       
                var oReader = new FileReader();
                oReader.onload = function(e) {         
                    var sFileContent = e.target.result; 
                    var base64str = sFileContent.replace(/^data:image\/\w+;base64,/, "");
                    console.log(base64str);
					var url = sessionStorage.getItem("isDeployedVersion")==="true"?this.getBaseURL() + "/odata/v4/maintenance/uploadImage":"/odata/v4/maintenance/uploadImage";
                    // var url = "/odata/v4/maintenance/uploadImage";
                    var data = JSON.stringify({        
                        image_data:  base64str
                        });   
						$.ajax({
							url : url,
							//url: this.getBaseURL() + "/odata/v4/chat/getChatRagResponse",
							//url: "/odata/v4/chat/getChatRagResponse",
							type: 'POST',
							contentType: 'application/json',
							async: true,
							data: data,
							success: function (body, status) {
								console.log(body);
								console.log('Order created successfully:', body.message);  
								if (body.message) {
									var obj = JSON.parse(body.message)
									var sCode = obj.data[0].className;
									console.log('damage_code is ' + obj.data[0].className)
									var oItemsBinding = this.byId("materialTable").getBinding("rows");
									oItemsBinding.create({"nID": this.getView().getBindingContext("maintnot").getProperty("ID"), "material_code": sCode, "imageUrl":"https://ui5.sap.com/1.120.9/test-resources/sap/ui/documentation/sdk/images/HT-1000.jpg" }, /*bAtEnd*/ true, {inactive : false});

								} 


						
							}.bind(this),
							error: function (response, status) {
								console.error('Error:', error);
							}.bind(this)
						})


					// fetch(url, {
                    //         method: 'POST', 
                    //         headers: {
                    //             'Content-Type': 'application/json'       
                    //         },        
                    //         body: data    
                    //     }).then(
					// 		response => response.json()
					// 	)    
                    //     .then(data => {       
                    //         console.log('Order created successfully:', data);  
                    //         if (data.response) {
                    //             var obj = JSON.parse(data.response)
                    //             console.log('damage_code is ' + obj.data[0].className)
                    //         } 
                    //         // this.getBindingContext().setProperty("damage_group", "D_1234");
                    //     })
                    //     .catch((error) => {   
                    //         console.error('Error:', error);
                    //     })     
                    }.bind(this);        
                oReader.readAsDataURL(oFile); 
            }
        },
        handleUploadComplete: function(oEvent) {
			var sResponse = oEvent.getParameter("response"),
				aRegexResult = /\d{4}/.exec(sResponse),
				iHttpStatusCode = aRegexResult && parseInt(aRegexResult[0]),
				sMessage;

			if (sResponse) {
				sMessage = iHttpStatusCode === 200 ? sResponse + " (Upload Success)" : sResponse + " (Upload Error)";
				MessageToast.show(sMessage);
			}
		},
		// onFileChange: function (oEvent) {
		// 	debugger
		// 	var oFileUploader = oEvent.getSource();
		// 	if (!oFileUploader.getValue()) {
				
		// 		return;
		// 	}
		// 	oFileUploader.checkFileReadable().then(function() {
		// 		oFileUploader.upload();
		// 	}, function(error) {
		// 		MessageToast.show("The file cannot be read. It may have changed.");
		// 	}).then(function() {
		// 		oFileUploader.clear();
		// 	});

		// },
		// handleUploadComplete: function (oEvent) {
		// 	debugger
		// 	var sResponse = oEvent.getParameter("response");
		// },
		_onMaintMatched: function (oEvent) {
			this._maintnot = oEvent.getParameter("arguments").maintnotID || this._maintnot || "0";
			var sPath = "/" + this._maintnot;
			// var oContext = this.getView().getModel("maintnot").getKeepAliveContext(sPath, /*bRequestMessages*/ true,
			// 	{$$patchWithoutSideEffects : true});
			// this.getView().setBindingContext(oContext);
			// this.getView().getBindingContext().refresh();
			// this.byId("ObjectPageLayout").bindElement({
			// 		path: sPath,
			// 		model: "maintnot"
			// 	});

			this.getView().bindElement({
				path: "/" + this._maintnot,
				model: "maintnot"
			});

		// 	var oContext,
		// 	// sPath = "/Products" + oEvent.getParameter("arguments").key,
		// 	oView = this.getView();

		// oContext = oView.getBindingContext("maintnot");
		// if (oContext && oContext !== this.oActiveContext) {
		// 	oContext.setKeepAlive(false);
		// }
		// oContext = oView.getModel().getKeepAliveContext(sPath, false,
		// 	{$$patchWithoutSideEffects : true});
		// oView.setBindingContext(oContext,"maintnot");
		// oView.setBusy(true);
		// oContext.requestProperty("equipment").catch(function () {
		// 	// ignore; it's logged anyway
		// }).finally(function () {
		// 	oView.setBusy(false);
		// });


		}
	});
});
