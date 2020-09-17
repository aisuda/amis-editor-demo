define('252f842', function(require, exports, module) {

  /*---------------------------------------------------------------------------------------------
   *  Copyright (c) Microsoft Corporation. All rights reserved.
   *  Licensed under the MIT License. See License.txt in the project root for license information.
   *--------------------------------------------------------------------------------------------*/
  'use strict';
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.getSelectionRanges = void 0;
  var main_js_1 = require("6b31927");
  var cssNodes_js_1 = require("0b0187d");
  var cssLanguageTypes_js_1 = require("1ea32d2");
  function getSelectionRanges(document, positions, stylesheet) {
      function getSelectionRange(position) {
          var applicableRanges = getApplicableRanges(position);
          var ranges = applicableRanges.map(function (pair) {
              return {
                  range: main_js_1.Range.create(document.positionAt(pair[0]), document.positionAt(pair[1])),
                  kind: cssLanguageTypes_js_1.SelectionRangeKind.Statement
              };
          });
          return ranges;
      }
      return positions.map(getSelectionRange);
      function getApplicableRanges(position) {
          var currNode = stylesheet.findChildAtOffset(document.offsetAt(position), true);
          if (!currNode) {
              return [];
          }
          var result = [];
          while (currNode) {
              if (currNode.parent &&
                  currNode.offset === currNode.parent.offset &&
                  currNode.end === currNode.parent.end) {
                  currNode = currNode.parent;
                  continue;
              }
              if (currNode.type === cssNodes_js_1.NodeType.Declarations) {
                  result.push([currNode.offset + 1, currNode.end - 1]);
              }
              else {
                  result.push([currNode.offset, currNode.end]);
              }
              currNode = currNode.parent;
          }
          return result;
      }
  }
  exports.getSelectionRanges = getSelectionRanges;
  

});
