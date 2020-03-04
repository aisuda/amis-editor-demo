define('1d5b9e7', function(require, exports, module) {

  /*---------------------------------------------------------------------------------------------
   *  Copyright (c) Microsoft Corporation. All rights reserved.
   *  Licensed under the MIT License. See License.txt in the project root for license information.
   *--------------------------------------------------------------------------------------------*/
  'use strict';
  Object.defineProperty(exports, "__esModule", { value: true });
  var tslib_1 = require("849c8c1");
  var worker = tslib_1.__importStar(require("b16a4ac"));
  var cssWorker_js_1 = require("a7597b7");
  self.onmessage = function () {
      // ignore the first message
      worker.initialize(function (ctx, createData) {
          return new cssWorker_js_1.CSSWorker(ctx, createData);
      });
  };
  

});
