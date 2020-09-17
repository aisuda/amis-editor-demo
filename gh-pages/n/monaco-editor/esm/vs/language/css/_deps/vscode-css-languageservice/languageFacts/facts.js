define('4b90411', function(require, exports, module) {

  /*---------------------------------------------------------------------------------------------
   *  Copyright (c) Microsoft Corporation. All rights reserved.
   *  Licensed under the MIT License. See License.txt in the project root for license information.
   *--------------------------------------------------------------------------------------------*/
  'use strict';
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.cssDataManager = void 0;
  var tslib_1 = require("849c8c1");
  var browsers = tslib_1.__importStar(require("caabc14"));
  var dataManager_js_1 = require("0f8ae09");
  var dataProvider_js_1 = require("badbd6c");
  tslib_1.__exportStar(require("8176e29"), exports);
  tslib_1.__exportStar(require("77e6e6f"), exports);
  tslib_1.__exportStar(require("85339ea"), exports);
  tslib_1.__exportStar(require("badbd6c"), exports);
  tslib_1.__exportStar(require("0f8ae09"), exports);
  exports.cssDataManager = new dataManager_js_1.CSSDataManager([
      new dataProvider_js_1.CSSDataProvider(browsers.cssData)
  ]);
  

});
