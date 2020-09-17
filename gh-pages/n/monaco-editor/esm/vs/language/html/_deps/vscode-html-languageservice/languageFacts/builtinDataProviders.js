define('776b99f', function(require, exports, module) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.handleCustomDataProviders = exports.getAllDataProviders = exports.builtinDataProviders = void 0;
  /*---------------------------------------------------------------------------------------------
   *  Copyright (c) Microsoft Corporation. All rights reserved.
   *  Licensed under the MIT License. See License.txt in the project root for license information.
   *--------------------------------------------------------------------------------------------*/
  var html5_js_1 = require("8aab4ba");
  exports.builtinDataProviders = [
      html5_js_1.getHTML5DataProvider()
  ];
  var customDataProviders = [];
  function getAllDataProviders() {
      return exports.builtinDataProviders.concat(customDataProviders);
  }
  exports.getAllDataProviders = getAllDataProviders;
  function handleCustomDataProviders(providers) {
      providers.forEach(function (p) {
          customDataProviders.push(p);
      });
  }
  exports.handleCustomDataProviders = handleCustomDataProviders;
  //# sourceMappingURL=builtinDataProviders.js.map
  

});
