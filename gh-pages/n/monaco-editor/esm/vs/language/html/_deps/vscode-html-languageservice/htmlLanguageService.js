define('127a609', function(require, exports, module) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.newHTMLDataProvider = exports.getLanguageService = void 0;
  var tslib_1 = require("849c8c1");
  /*---------------------------------------------------------------------------------------------
   *  Copyright (c) Microsoft Corporation. All rights reserved.
   *  Licensed under the MIT License. See License.txt in the project root for license information.
   *--------------------------------------------------------------------------------------------*/
  var htmlScanner_js_1 = require("c2d9747");
  var htmlParser_js_1 = require("035e64a");
  var htmlCompletion_js_1 = require("0865b74");
  var htmlHover_js_1 = require("6745835");
  var htmlFormatter_js_1 = require("a3a46f9");
  var htmlLinks_js_1 = require("a55007b");
  var htmlHighlighting_js_1 = require("764093d");
  var htmlSymbolsProvider_js_1 = require("b63a95f");
  var htmlFolding_js_1 = require("c2ce8ec");
  var htmlSelectionRange_js_1 = require("2c8eafa");
  var builtinDataProviders_js_1 = require("776b99f");
  var dataProvider_js_1 = require("f2fbec3");
  tslib_1.__exportStar(require("4ee499b"), exports);
  tslib_1.__exportStar(require("b1903ef"), exports);
  function getLanguageService(options) {
      var htmlCompletion = new htmlCompletion_js_1.HTMLCompletion();
      if (options && options.customDataProviders) {
          builtinDataProviders_js_1.handleCustomDataProviders(options.customDataProviders);
      }
      return {
          createScanner: htmlScanner_js_1.createScanner,
          parseHTMLDocument: function (document) { return htmlParser_js_1.parse(document.getText()); },
          doComplete: htmlCompletion.doComplete.bind(htmlCompletion),
          setCompletionParticipants: htmlCompletion.setCompletionParticipants.bind(htmlCompletion),
          doHover: htmlHover_js_1.doHover,
          format: htmlFormatter_js_1.format,
          findDocumentHighlights: htmlHighlighting_js_1.findDocumentHighlights,
          findDocumentLinks: htmlLinks_js_1.findDocumentLinks,
          findDocumentSymbols: htmlSymbolsProvider_js_1.findDocumentSymbols,
          getFoldingRanges: htmlFolding_js_1.getFoldingRanges,
          getSelectionRanges: htmlSelectionRange_js_1.getSelectionRanges,
          doTagComplete: htmlCompletion.doTagComplete.bind(htmlCompletion),
      };
  }
  exports.getLanguageService = getLanguageService;
  function newHTMLDataProvider(id, customData) {
      return new dataProvider_js_1.HTMLDataProvider(id, customData);
  }
  exports.newHTMLDataProvider = newHTMLDataProvider;
  //# sourceMappingURL=htmlLanguageService.js.map
  

});
