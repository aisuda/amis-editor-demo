define('6745835', function(require, exports, module) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.doHover = void 0;
  /*---------------------------------------------------------------------------------------------
   *  Copyright (c) Microsoft Corporation. All rights reserved.
   *  Licensed under the MIT License. See License.txt in the project root for license information.
   *--------------------------------------------------------------------------------------------*/
  var htmlScanner_js_1 = require("c2d9747");
  var main_js_1 = require("b1903ef");
  var htmlLanguageTypes_js_1 = require("4ee499b");
  var builtinDataProviders_js_1 = require("776b99f");
  function doHover(document, position, htmlDocument) {
      var offset = document.offsetAt(position);
      var node = htmlDocument.findNodeAt(offset);
      if (!node || !node.tag) {
          return null;
      }
      var dataProviders = builtinDataProviders_js_1.getAllDataProviders().filter(function (p) { return p.isApplicable(document.languageId); });
      function getTagHover(currTag, range, open) {
          currTag = currTag.toLowerCase();
          var _loop_1 = function (provider) {
              var hover = null;
              provider.provideTags().forEach(function (tag) {
                  if (tag.name.toLowerCase() === currTag.toLowerCase()) {
                      var tagLabel = open ? '<' + currTag + '>' : '</' + currTag + '>';
                      var tagDescription = tag.description || '';
                      hover = { contents: [{ language: 'html', value: tagLabel }, main_js_1.MarkedString.fromPlainText(tagDescription)], range: range };
                  }
              });
              if (hover) {
                  return { value: hover };
              }
          };
          for (var _i = 0, dataProviders_1 = dataProviders; _i < dataProviders_1.length; _i++) {
              var provider = dataProviders_1[_i];
              var state_1 = _loop_1(provider);
              if (typeof state_1 === "object")
                  return state_1.value;
          }
          return null;
      }
      function getTagNameRange(tokenType, startOffset) {
          var scanner = htmlScanner_js_1.createScanner(document.getText(), startOffset);
          var token = scanner.scan();
          while (token !== htmlLanguageTypes_js_1.TokenType.EOS && (scanner.getTokenEnd() < offset || scanner.getTokenEnd() === offset && token !== tokenType)) {
              token = scanner.scan();
          }
          if (token === tokenType && offset <= scanner.getTokenEnd()) {
              return { start: document.positionAt(scanner.getTokenOffset()), end: document.positionAt(scanner.getTokenEnd()) };
          }
          return null;
      }
      if (node.endTagStart && offset >= node.endTagStart) {
          var tagRange_1 = getTagNameRange(htmlLanguageTypes_js_1.TokenType.EndTag, node.endTagStart);
          if (tagRange_1) {
              return getTagHover(node.tag, tagRange_1, false);
          }
          return null;
      }
      var tagRange = getTagNameRange(htmlLanguageTypes_js_1.TokenType.StartTag, node.start);
      if (tagRange) {
          return getTagHover(node.tag, tagRange, true);
      }
      return null;
  }
  exports.doHover = doHover;
  //# sourceMappingURL=htmlHover.js.map
  

});
