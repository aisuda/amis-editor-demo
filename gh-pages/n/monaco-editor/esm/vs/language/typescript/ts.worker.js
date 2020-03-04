define('edfeaa6', function(require, exports, module) {

  /*---------------------------------------------------------------------------------------------
   *  Copyright (c) Microsoft Corporation. All rights reserved.
   *  Licensed under the MIT License. See License.txt in the project root for license information.
   *--------------------------------------------------------------------------------------------*/
  'use strict';
  Object.defineProperty(exports, "__esModule", { value: true });
  var tslib_1 = require("849c8c1");
  var worker = tslib_1.__importStar(require("b16a4ac"));
  var tsWorker_js_1 = require("b2bae0f");
  self.onmessage = function () {
      // ignore the first message
      worker.initialize(function (ctx, createData) {
          return new tsWorker_js_1.TypeScriptWorker(ctx, createData);
      });
  };
  

});
