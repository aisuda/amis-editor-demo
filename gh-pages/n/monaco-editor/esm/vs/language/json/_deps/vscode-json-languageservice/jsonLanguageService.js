define('d0040fa', function(require, exports, module) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  var tslib_1 = require("849c8c1");
  /*---------------------------------------------------------------------------------------------
   *  Copyright (c) Microsoft Corporation. All rights reserved.
   *  Licensed under the MIT License. See License.txt in the project root for license information.
   *--------------------------------------------------------------------------------------------*/
  var main_js_1 = require("4872c6c");
  exports.TextDocument = main_js_1.TextDocument;
  exports.Position = main_js_1.Position;
  exports.CompletionItem = main_js_1.CompletionItem;
  exports.CompletionList = main_js_1.CompletionList;
  exports.Hover = main_js_1.Hover;
  exports.Range = main_js_1.Range;
  exports.SymbolInformation = main_js_1.SymbolInformation;
  exports.Diagnostic = main_js_1.Diagnostic;
  exports.TextEdit = main_js_1.TextEdit;
  exports.FormattingOptions = main_js_1.FormattingOptions;
  exports.MarkedString = main_js_1.MarkedString;
  var jsonCompletion_js_1 = require("2b1fcae");
  var jsonHover_js_1 = require("fa9f56b");
  var jsonValidation_js_1 = require("5067f53");
  var jsonDocumentSymbols_js_1 = require("1a9046e");
  var jsonParser_js_1 = require("c4fc87e");
  var configuration_js_1 = require("6389b58");
  var jsonSchemaService_js_1 = require("829557b");
  var jsonFolding_js_1 = require("db2041a");
  var jsonSelectionRanges_js_1 = require("b8264ed");
  var main_js_2 = require("c2fdf10");
  tslib_1.__exportStar(require("3607d51"), exports);
  function getLanguageService(params) {
      var promise = params.promiseConstructor || Promise;
      var jsonSchemaService = new jsonSchemaService_js_1.JSONSchemaService(params.schemaRequestService, params.workspaceContext, promise);
      jsonSchemaService.setSchemaContributions(configuration_js_1.schemaContributions);
      var jsonCompletion = new jsonCompletion_js_1.JSONCompletion(jsonSchemaService, params.contributions, promise, params.clientCapabilities);
      var jsonHover = new jsonHover_js_1.JSONHover(jsonSchemaService, params.contributions, promise);
      var jsonDocumentSymbols = new jsonDocumentSymbols_js_1.JSONDocumentSymbols(jsonSchemaService);
      var jsonValidation = new jsonValidation_js_1.JSONValidation(jsonSchemaService, promise);
      return {
          configure: function (settings) {
              jsonSchemaService.clearExternalSchemas();
              if (settings.schemas) {
                  settings.schemas.forEach(function (settings) {
                      jsonSchemaService.registerExternalSchema(settings.uri, settings.fileMatch, settings.schema);
                  });
              }
              jsonValidation.configure(settings);
          },
          resetSchema: function (uri) { return jsonSchemaService.onResourceChange(uri); },
          doValidation: jsonValidation.doValidation.bind(jsonValidation),
          parseJSONDocument: function (document) { return jsonParser_js_1.parse(document, { collectComments: true }); },
          newJSONDocument: function (root, diagnostics) { return jsonParser_js_1.newJSONDocument(root, diagnostics); },
          doResolve: jsonCompletion.doResolve.bind(jsonCompletion),
          doComplete: jsonCompletion.doComplete.bind(jsonCompletion),
          findDocumentSymbols: jsonDocumentSymbols.findDocumentSymbols.bind(jsonDocumentSymbols),
          findDocumentSymbols2: jsonDocumentSymbols.findDocumentSymbols2.bind(jsonDocumentSymbols),
          findColorSymbols: function (d, s) { return jsonDocumentSymbols.findDocumentColors(d, s).then(function (s) { return s.map(function (s) { return s.range; }); }); },
          findDocumentColors: jsonDocumentSymbols.findDocumentColors.bind(jsonDocumentSymbols),
          getColorPresentations: jsonDocumentSymbols.getColorPresentations.bind(jsonDocumentSymbols),
          doHover: jsonHover.doHover.bind(jsonHover),
          getFoldingRanges: jsonFolding_js_1.getFoldingRanges,
          getSelectionRanges: jsonSelectionRanges_js_1.getSelectionRanges,
          format: function (d, r, o) {
              var range = void 0;
              if (r) {
                  var offset = d.offsetAt(r.start);
                  var length = d.offsetAt(r.end) - offset;
                  range = { offset: offset, length: length };
              }
              var options = { tabSize: o ? o.tabSize : 4, insertSpaces: o ? o.insertSpaces : true, eol: '\n' };
              return main_js_2.format(d.getText(), range, options).map(function (e) {
                  return main_js_1.TextEdit.replace(main_js_1.Range.create(d.positionAt(e.offset), d.positionAt(e.offset + e.length)), e.content);
              });
          }
      };
  }
  exports.getLanguageService = getLanguageService;
  

});
