define('a22b28e', function(require, exports, module) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.config = exports.loadMessageBundle = void 0;
  /*---------------------------------------------------------------------------------------------
   *  Copyright (c) Microsoft Corporation. All rights reserved.
   *  Licensed under the MIT License. See License.txt in the project root for license information.
   *--------------------------------------------------------------------------------------------*/
  function format(message, args) {
      var result;
      if (args.length === 0) {
          result = message;
      }
      else {
          result = message.replace(/\{(\d+)\}/g, function (match, rest) {
              var index = rest[0];
              return typeof args[index] !== 'undefined' ? args[index] : match;
          });
      }
      return result;
  }
  function localize(key, message) {
      var args = [];
      for (var _i = 2; _i < arguments.length; _i++) {
          args[_i - 2] = arguments[_i];
      }
      return format(message, args);
  }
  function loadMessageBundle(file) {
      return localize;
  }
  exports.loadMessageBundle = loadMessageBundle;
  function config(opt) {
      return loadMessageBundle;
  }
  exports.config = config;
  

});
