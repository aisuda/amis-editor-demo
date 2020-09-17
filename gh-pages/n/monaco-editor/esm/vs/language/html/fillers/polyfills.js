define('2ccba90', function(require, exports, module) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.polyfill = void 0;
  /*---------------------------------------------------------------------------------------------
   *  Copyright (c) Microsoft Corporation. All rights reserved.
   *  Licensed under the MIT License. See License.txt in the project root for license information.
   *--------------------------------------------------------------------------------------------*/
  function polyfill() {
      // Object.assign, for IE11
      if (typeof Object['assign'] != 'function') {
          Object.defineProperty(Object, "assign", {
              value: function assign(destination, sources) {
                  'use strict';
                  if (destination !== null) {
                      for (var i = 1; i < arguments.length; i++) {
                          var source = arguments[i];
                          if (source) {
                              for (var key in source) {
                                  if (Object.prototype.hasOwnProperty.call(source, key)) {
                                      destination[key] = source[key];
                                  }
                              }
                          }
                      }
                      ;
                  }
                  return destination;
              },
              writable: true,
              configurable: true
          });
      }
  }
  exports.polyfill = polyfill;
  

});
