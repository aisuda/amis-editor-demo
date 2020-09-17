define('b8264ed', function(require, exports, module) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.getSelectionRanges = void 0;
  /*---------------------------------------------------------------------------------------------
   *  Copyright (c) Microsoft Corporation. All rights reserved.
   *  Licensed under the MIT License. See License.txt in the project root for license information.
   *--------------------------------------------------------------------------------------------*/
  var main_js_1 = require("4872c6c");
  var main_js_2 = require("c2fdf10");
  var jsonLanguageTypes_js_1 = require("3607d51");
  function getSelectionRanges(document, positions, doc) {
      function getSelectionRange(position) {
          var offset = document.offsetAt(position);
          var node = doc.getNodeFromOffset(offset, true);
          if (!node) {
              return [];
          }
          var result = [];
          while (node) {
              switch (node.type) {
                  case 'string':
                  case 'object':
                  case 'array':
                      // range without ", [ or {
                      var cStart = node.offset + 1, cEnd = node.offset + node.length - 1;
                      if (cStart < cEnd && offset >= cStart && offset <= cEnd) {
                          result.push(newRange(cStart, cEnd));
                      }
                      result.push(newRange(node.offset, node.offset + node.length));
                      break;
                  case 'number':
                  case 'boolean':
                  case 'null':
                  case 'property':
                      result.push(newRange(node.offset, node.offset + node.length));
                      break;
              }
              if (node.type === 'property' || node.parent && node.parent.type === 'array') {
                  var afterCommaOffset = getOffsetAfterNextToken(node.offset + node.length, 5 /* CommaToken */);
                  if (afterCommaOffset !== -1) {
                      result.push(newRange(node.offset, afterCommaOffset));
                  }
              }
              node = node.parent;
          }
          return result;
      }
      function newRange(start, end) {
          return {
              range: main_js_1.Range.create(document.positionAt(start), document.positionAt(end)),
              kind: jsonLanguageTypes_js_1.SelectionRangeKind.Declaration
          };
      }
      var scanner = main_js_2.createScanner(document.getText(), true);
      function getOffsetAfterNextToken(offset, expectedToken) {
          scanner.setPosition(offset);
          var token = scanner.scan();
          if (token === expectedToken) {
              return scanner.getTokenOffset() + scanner.getTokenLength();
          }
          return -1;
      }
      return positions.map(getSelectionRange);
  }
  exports.getSelectionRanges = getSelectionRanges;
  

});
