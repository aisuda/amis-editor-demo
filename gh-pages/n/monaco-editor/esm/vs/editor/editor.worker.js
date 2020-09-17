define('b16a4ac', function(require, exports, module) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.initialize = void 0;
  /*---------------------------------------------------------------------------------------------
   *  Copyright (c) Microsoft Corporation. All rights reserved.
   *  Licensed under the MIT License. See License.txt in the project root for license information.
   *--------------------------------------------------------------------------------------------*/
  var simpleWorker_js_1 = require("6c1fbf8");
  var editorSimpleWorker_js_1 = require("654e4ab");
  var initialized = false;
  function initialize(foreignModule) {
      if (initialized) {
          return;
      }
      initialized = true;
      var editorWorker = new editorSimpleWorker_js_1.EditorSimpleWorkerImpl(foreignModule);
      var simpleWorker = new simpleWorker_js_1.SimpleWorkerServer(function (msg) {
          self.postMessage(msg);
      }, editorWorker);
      self.onmessage = function (e) {
          simpleWorker.onmessage(e.data);
      };
  }
  exports.initialize = initialize;
  self.onmessage = function (e) {
      // Ignore first message in this case and initialize if not yet initialized
      if (!initialized) {
          initialize(null);
      }
  };
  

});
