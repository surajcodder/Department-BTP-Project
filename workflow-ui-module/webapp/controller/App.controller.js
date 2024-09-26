// sap.ui.define(
//   [
//     "sap/ui/core/mvc/Controller",
//     "sap/ui/model/json/JSONModel"
//   ],
//   function (BaseController,JSONModel) {
//     "use strict";


//     return BaseController.extend("workflowmanagement.workflowuimodule.controller.App", {
//       onInit() {
//         debugger
//          // Defer the execution to after the view is rendered
//         this.getView().addEventDelegate({
//           onAfterRendering: () => {
//             this.onBeforeRendering();
//       },
//       onBeforeRendering(oEvent) {
//         debugger
//         var oUploadSet = this.byId("uploadSet");
//       //   var binding = oEvent.oSource.mBindingInfos.items.binding.oContext;
//     //   var oBinding = oUploadSet.getBinding("items");
//     // oBinding.refresh();
//       //   var oBinding = oUploadSet.getBinding("items");
//         var oView = this.getView();
//         var urll = oView.oPropagatedProperties.oModels.context.oData.PdfDocument;

//         // Perform an AJAX call to get the PDF links
//        const link = 'https://f5b5e17atrial-dev15-department-srv.cfapps.us10-001.hana.ondemand.com/odata/v4/my/';
//        var finalLink = link+urll;
//        $.ajax({
//         url: finalLink,
//         method: "GET",
//         success: function(oData) {
//           debugger
//             var oModel = new sap.ui.model.json.JSONModel();
//             oModel.setData({ Files: oData.value }); // Assign the array directly
//             oView.setModel(oModel, "myModel");
//              // Set the model with name "myModel"
//         },
//         error: function(jqXHR, textStatus, errorThrown) {
//             console.error("Error in fetching data: " + textStatus + ': ' + errorThrown);
//         }
//     });
//     },
//     onOpenPressed: function (oEvent) {
//       debugger
//       var baseUrl = "https://f5b5e17atrial-dev15-department-srv.cfapps.us10-001.hana.ondemand.com/odata/v4/my/"; 
//       let fileurl = oEvent.oSource.mProperties.url;
//       var pattern = /Files.*$/;
//       var match = fileurl.match(pattern);
//       if (match) {
//         var entityUrl = baseUrl + match[0];
//       }
//       oEvent.oSource.mProperties.url = entityUrl;
//     }
      
//     });
//   }
// );

sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
  ],
  function (BaseController, JSONModel) {
    "use strict";

    return BaseController.extend("workflowmanagement.workflowuimodule.controller.App", {
      onInit() {
        // Defer the execution to after the view is rendered
        this.getView().addEventDelegate({
          onAfterRendering: () => {
            this.onBeforeRendering();
          }
        });
      },

      onBeforeRendering(oEvent) {
        // Use setTimeout to delay execution
        setTimeout(() => {
          var oUploadSet = this.byId("uploadSet");

          var oView = this.getView();
          var urll = oView.oPropagatedProperties.oModels.context.oData.PdfDocument;
          console.log(urll);

          const link = 'https://f5b5e17atrial-dev15-department-srv.cfapps.us10-001.hana.ondemand.com/odata/v4/my/';
          var finalLink = link + urll;

          this._fetchPDFLinks(finalLink)
            .then(function(oData) {
              var oModel = new sap.ui.model.json.JSONModel();
              oModel.setData({ Files: oData.value }); // Assign the array directly
              oView.setModel(oModel, "myModel"); // Set the model with name "myModel"
            })
            .catch(function(error) {
              console.error("Error in fetching data: " + error);
            });
        }, 300); // Delay of 100ms, you can adjust this if necessary
      },

      _fetchPDFLinks: function(url) {
        return new Promise(function(resolve, reject) {
          $.ajax({
            url: url,
            method: "GET",
            success: function(oData) {
              resolve(oData);
            },
            error: function(jqXHR, textStatus, errorThrown) {
              reject(textStatus + ': ' + errorThrown);
            }
          });
        });
      },

      onOpenPressed: function (oEvent) {
        var baseUrl = "https://f5b5e17atrial-dev15-department-srv.cfapps.us10-001.hana.ondemand.com/odata/v4/my/"; 
        let fileurl = oEvent.getSource().getUrl();
        var pattern = /Files.*$/;
        var match = fileurl.match(pattern);
        if (match) {
          var entityUrl = baseUrl + match[0];
        }
        oEvent.getSource().setUrl(entityUrl);
      }
    });
  }
);
