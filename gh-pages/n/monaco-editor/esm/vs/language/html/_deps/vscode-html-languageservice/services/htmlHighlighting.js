define('764093d', function(require, exports, module) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.findDocumentHighlights = void 0;
  /*---------------------------------------------------------------------------------------------
   *  Copyright (c) Microsoft Corporation. All rights reserved.
   *  Licensed under the MIT License. See License.txt in the project root for license information.
   *--------------------------------------------------------------------------------------------*/
  var htmlScanner_js_1 = require("c2d9747");
  var main_js_1 = require("b1903ef");
  var htmlLanguageTypes_js_1 = require("4ee499b");
  function findDocumentHighlights(document, position, htmlDocument) {
      var offset = document.offsetAt(position);
      var node = htmlDocument.findNodeAt(offset);
      if (!node.tag) {
          return [];
      }
      var result = [];
      var startTagRange = getTagNameRange(htmlLanguageTypes_js_1.TokenType.StartTag, document, node.start);
      var endTagRange = typeof node.endTagStart === 'number' && getTagNameRange(htmlLanguageTypes_js_1.TokenType.EndTag, document, node.endTagStart);
      if (startTagRange && covers(startTagRange, position) || endTagRange && covers(endTagRange, position)) {
          if (startTagRange) {
              result.push({ kind: main_js_1.DocumentHighlightKind.Read, range: startTagRange });
          }
          if (endTagRange) {
              result.push({ kind: main_js_1.DocumentHighlightKind.Read, range: endTagRange });
          }
      }
      return result;
  }
  exports.findDocumentHighlights = findDocumentHighlights;
  function isBeforeOrEqual(pos1, pos2) {
      return pos1.line < pos2.line || (pos1.line === pos2.line && pos1.character <= pos2.character);
  }
  function covers(range, position) {
      return isBeforeOrEqual(range.start, position) && isBeforeOrEqual(position, range.end);
  }
  function getTagNameRange(tokenType, document, startOffset) {
      var scanner = htmlScanner_js_1.createScanner(document.getText(), startOffset);
      var token = scanner.scan();
      while (token !== htmlLanguageTypes_js_1.TokenType.EOS && token !== tokenType) {
          token = scanner.scan();
      }
      if (token !== htmlLanguageTypes_js_1.TokenType.EOS) {
          return { start: document.positionAt(scanner.getTokenOffset()), end: document.positionAt(scanner.getTokenEnd()) };
      }
      return null;
  }
  //# sourceMappingURL=htmlHighlighting.js.map
  

});
