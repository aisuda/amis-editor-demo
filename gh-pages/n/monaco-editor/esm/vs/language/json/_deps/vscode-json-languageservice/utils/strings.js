define('1d1e390', function(require, exports, module) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.repeat = exports.convertSimple2RegExpPattern = exports.endsWith = exports.startsWith = void 0;
  /*---------------------------------------------------------------------------------------------
  *  Copyright (c) Microsoft Corporation. All rights reserved.
  *  Licensed under the MIT License. See License.txt in the project root for license information.
  *--------------------------------------------------------------------------------------------*/
  function startsWith(haystack, needle) {
      if (haystack.length < needle.length) {
          return false;
      }
      for (var i = 0; i < needle.length; i++) {
          if (haystack[i] !== needle[i]) {
              return false;
          }
      }
      return true;
  }
  exports.startsWith = startsWith;
  /**
   * Determines if haystack ends with needle.
   */
  function endsWith(haystack, needle) {
      var diff = haystack.length - needle.length;
      if (diff > 0) {
          return haystack.lastIndexOf(needle) === diff;
      }
      else if (diff === 0) {
          return haystack === needle;
      }
      else {
          return false;
      }
  }
  exports.endsWith = endsWith;
  function convertSimple2RegExpPattern(pattern) {
      return pattern.replace(/[\-\\\{\}\+\?\|\^\$\.\,\[\]\(\)\#\s]/g, '\\$&').replace(/[\*]/g, '.*');
  }
  exports.convertSimple2RegExpPattern = convertSimple2RegExpPattern;
  function repeat(value, count) {
      var s = '';
      while (count > 0) {
          if ((count & 1) === 1) {
              s += value;
          }
          value += value;
          count = count >>> 1;
      }
      return s;
  }
  exports.repeat = repeat;
  

});
