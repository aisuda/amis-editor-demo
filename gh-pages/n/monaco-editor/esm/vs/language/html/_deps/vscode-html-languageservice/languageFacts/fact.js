define('46a8b2e', function(require, exports, module) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.isVoidElement = exports.VOID_ELEMENTS = void 0;
  var tslib_1 = require("849c8c1");
  /*---------------------------------------------------------------------------------------------
   *  Copyright (c) Microsoft Corporation. All rights reserved.
   *  Licensed under the MIT License. See License.txt in the project root for license information.
   *--------------------------------------------------------------------------------------------*/
  var arrays = tslib_1.__importStar(require("7caa5b3"));
  // As defined in https://www.w3.org/TR/html5/syntax.html#void-elements
  exports.VOID_ELEMENTS = ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'keygen', 'link', 'menuitem', 'meta', 'param', 'source', 'track', 'wbr'];
  function isVoidElement(e) {
      return !!e && arrays.binarySearch(exports.VOID_ELEMENTS, e.toLowerCase(), function (s1, s2) { return s1.localeCompare(s2); }) >= 0;
  }
  exports.isVoidElement = isVoidElement;
  //# sourceMappingURL=fact.js.map
  

});
