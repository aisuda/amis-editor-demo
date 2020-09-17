define('f0b3e8e', function(require, exports, module) {

  /*---------------------------------------------------------------------------------------------
   *  Copyright (c) Microsoft Corporation. All rights reserved.
   *  Licensed under the MIT License. See License.txt in the project root for license information.
   *--------------------------------------------------------------------------------------------*/
  'use strict';
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.values = void 0;
  function values(obj) {
      return Object.keys(obj).map(function (k) { return obj[k]; });
  }
  exports.values = values;
  

});
