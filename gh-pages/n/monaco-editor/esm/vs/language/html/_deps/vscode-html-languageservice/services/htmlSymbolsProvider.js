define('b63a95f', function(require, exports, module) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.findDocumentSymbols = void 0;
  /*---------------------------------------------------------------------------------------------
   *  Copyright (c) Microsoft Corporation. All rights reserved.
   *  Licensed under the MIT License. See License.txt in the project root for license information.
   *--------------------------------------------------------------------------------------------*/
  var main_js_1 = require("b1903ef");
  function findDocumentSymbols(document, htmlDocument) {
      var symbols = [];
      htmlDocument.roots.forEach(function (node) {
          provideFileSymbolsInternal(document, node, '', symbols);
      });
      return symbols;
  }
  exports.findDocumentSymbols = findDocumentSymbols;
  function provideFileSymbolsInternal(document, node, container, symbols) {
      var name = nodeToName(node);
      var location = main_js_1.Location.create(document.uri, main_js_1.Range.create(document.positionAt(node.start), document.positionAt(node.end)));
      var symbol = {
          name: name,
          location: location,
          containerName: container,
          kind: main_js_1.SymbolKind.Field
      };
      symbols.push(symbol);
      node.children.forEach(function (child) {
          provideFileSymbolsInternal(document, child, name, symbols);
      });
  }
  function nodeToName(node) {
      var name = node.tag;
      if (node.attributes) {
          var id = node.attributes['id'];
          var classes = node.attributes['class'];
          if (id) {
              name += "#" + id.replace(/[\"\']/g, '');
          }
          if (classes) {
              name += classes.replace(/[\"\']/g, '').split(/\s+/).map(function (className) { return "." + className; }).join('');
          }
      }
      return name || '?';
  }
  //# sourceMappingURL=htmlSymbolsProvider.js.map
  

});
