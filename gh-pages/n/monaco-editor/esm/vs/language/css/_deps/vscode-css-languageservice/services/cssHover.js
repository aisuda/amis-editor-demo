define('dda58db', function(require, exports, module) {

  /*---------------------------------------------------------------------------------------------
   *  Copyright (c) Microsoft Corporation. All rights reserved.
   *  Licensed under the MIT License. See License.txt in the project root for license information.
   *--------------------------------------------------------------------------------------------*/
  'use strict';
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.CSSHover = void 0;
  var tslib_1 = require("849c8c1");
  var nodes = tslib_1.__importStar(require("0b0187d"));
  var languageFacts = tslib_1.__importStar(require("4b90411"));
  var main_js_1 = require("6b31927");
  var selectorPrinting_js_1 = require("22d9c7b");
  var CSSHover = /** @class */ (function () {
      function CSSHover() {
      }
      CSSHover.prototype.doHover = function (document, position, stylesheet) {
          function getRange(node) {
              return main_js_1.Range.create(document.positionAt(node.offset), document.positionAt(node.end));
          }
          var offset = document.offsetAt(position);
          var nodepath = nodes.getNodePath(stylesheet, offset);
          for (var i = 0; i < nodepath.length; i++) {
              var node = nodepath[i];
              if (node instanceof nodes.Selector) {
                  return {
                      contents: selectorPrinting_js_1.selectorToMarkedString(node),
                      range: getRange(node)
                  };
              }
              if (node instanceof nodes.SimpleSelector) {
                  return {
                      contents: selectorPrinting_js_1.simpleSelectorToMarkedString(node),
                      range: getRange(node)
                  };
              }
              if (node instanceof nodes.Declaration) {
                  var propertyName = node.getFullPropertyName();
                  var entry = languageFacts.cssDataManager.getProperty(propertyName);
                  if (entry) {
                      var contents = [];
                      if (entry.description) {
                          contents.push(main_js_1.MarkedString.fromPlainText(entry.description));
                      }
                      var browserLabel = languageFacts.getBrowserLabel(entry.browsers);
                      if (browserLabel) {
                          contents.push(main_js_1.MarkedString.fromPlainText(browserLabel));
                      }
                      if (contents.length) {
                          return {
                              contents: contents,
                              range: getRange(node)
                          };
                      }
                  }
              }
          }
          return null;
      };
      return CSSHover;
  }());
  exports.CSSHover = CSSHover;
  

});
