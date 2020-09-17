define('32f2bae', function(require, exports, module) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.js_beautify = void 0;
  /*---------------------------------------------------------------------------------------------
   *  Copyright (c) Microsoft Corporation. All rights reserved.
   *  Licensed under the MIT License. See License.txt in the project root for license information.
   *--------------------------------------------------------------------------------------------*/
  /*
   * Mock for the JS formatter. Ignore formatting of JS content in HTML.
   */
  function js_beautify(js_source_text, options) {
      // no formatting
      return js_source_text;
  }
  exports.js_beautify = js_beautify;
  //# sourceMappingURL=beautify.js.map
  

});
