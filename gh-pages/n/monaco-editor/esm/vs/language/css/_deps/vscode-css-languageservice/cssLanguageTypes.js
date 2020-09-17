define('1ea32d2', function(require, exports, module) {

  /*---------------------------------------------------------------------------------------------
   *  Copyright (c) Microsoft Corporation. All rights reserved.
   *  Licensed under the MIT License. See License.txt in the project root for license information.
   *--------------------------------------------------------------------------------------------*/
  'use strict';
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.SelectionRangeKind = exports.Position = exports.TextEdit = exports.Range = void 0;
  var main_js_1 = require("6b31927");
  Object.defineProperty(exports, "Range", { enumerable: true, get: function () { return main_js_1.Range; } });
  Object.defineProperty(exports, "TextEdit", { enumerable: true, get: function () { return main_js_1.TextEdit; } });
  Object.defineProperty(exports, "Position", { enumerable: true, get: function () { return main_js_1.Position; } });
  (function (SelectionRangeKind) {
      /**
       * Empty Kind.
       */
      SelectionRangeKind["Empty"] = "";
      /**
       * The statment kind, its value is `statement`, possible extensions can be
       * `statement.if` etc
       */
      SelectionRangeKind["Statement"] = "statement";
      /**
       * The declaration kind, its value is `declaration`, possible extensions can be
       * `declaration.function`, `declaration.class` etc.
       */
      SelectionRangeKind["Declaration"] = "declaration";
  })(exports.SelectionRangeKind || (exports.SelectionRangeKind = {}));
  

});
