define('5ed085d', function(require, exports, module) {

  /*---------------------------------------------------------------------------------------------
   *  Copyright (c) Microsoft Corporation. All rights reserved.
   *  Licensed under the MIT License. See License.txt in the project root for license information.
   *--------------------------------------------------------------------------------------------*/
  'use strict';
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.getLESSLanguageService = exports.getSCSSLanguageService = exports.getCSSLanguageService = void 0;
  var tslib_1 = require("849c8c1");
  var cssParser_js_1 = require("f65c4e4");
  var cssCompletion_js_1 = require("81478b3");
  var cssHover_js_1 = require("dda58db");
  var cssNavigation_js_1 = require("ab5a974");
  var cssCodeActions_js_1 = require("c8c7fe4");
  var cssValidation_js_1 = require("b3e3fff");
  var scssParser_js_1 = require("0ef8562");
  var scssCompletion_js_1 = require("012257c");
  var lessParser_js_1 = require("fd6aacf");
  var lessCompletion_js_1 = require("beeda39");
  var cssFolding_js_1 = require("8292f2f");
  var facts_js_1 = require("4b90411");
  var cssSelectionRange_js_1 = require("252f842");
  tslib_1.__exportStar(require("1ea32d2"), exports);
  tslib_1.__exportStar(require("6b31927"), exports);
  function createFacade(parser, completion, hover, navigation, codeActions, validation) {
      return {
          configure: validation.configure.bind(validation),
          doValidation: validation.doValidation.bind(validation),
          parseStylesheet: parser.parseStylesheet.bind(parser),
          doComplete: completion.doComplete.bind(completion),
          setCompletionParticipants: completion.setCompletionParticipants.bind(completion),
          doHover: hover.doHover.bind(hover),
          findDefinition: navigation.findDefinition.bind(navigation),
          findReferences: navigation.findReferences.bind(navigation),
          findDocumentHighlights: navigation.findDocumentHighlights.bind(navigation),
          findDocumentLinks: navigation.findDocumentLinks.bind(navigation),
          findDocumentSymbols: navigation.findDocumentSymbols.bind(navigation),
          doCodeActions: codeActions.doCodeActions.bind(codeActions),
          doCodeActions2: codeActions.doCodeActions2.bind(codeActions),
          findColorSymbols: function (d, s) { return navigation.findDocumentColors(d, s).map(function (s) { return s.range; }); },
          findDocumentColors: navigation.findDocumentColors.bind(navigation),
          getColorPresentations: navigation.getColorPresentations.bind(navigation),
          doRename: navigation.doRename.bind(navigation),
          getFoldingRanges: cssFolding_js_1.getFoldingRanges,
          getSelectionRanges: cssSelectionRange_js_1.getSelectionRanges
      };
  }
  function handleCustomData(options) {
      if (options && options.customDataProviders) {
          facts_js_1.cssDataManager.addDataProviders(options.customDataProviders);
      }
  }
  function getCSSLanguageService(options) {
      handleCustomData(options);
      return createFacade(new cssParser_js_1.Parser(), new cssCompletion_js_1.CSSCompletion(), new cssHover_js_1.CSSHover(), new cssNavigation_js_1.CSSNavigation(), new cssCodeActions_js_1.CSSCodeActions(), new cssValidation_js_1.CSSValidation());
  }
  exports.getCSSLanguageService = getCSSLanguageService;
  function getSCSSLanguageService(options) {
      handleCustomData(options);
      return createFacade(new scssParser_js_1.SCSSParser(), new scssCompletion_js_1.SCSSCompletion(), new cssHover_js_1.CSSHover(), new cssNavigation_js_1.CSSNavigation(), new cssCodeActions_js_1.CSSCodeActions(), new cssValidation_js_1.CSSValidation());
  }
  exports.getSCSSLanguageService = getSCSSLanguageService;
  function getLESSLanguageService(options) {
      handleCustomData(options);
      return createFacade(new lessParser_js_1.LESSParser(), new lessCompletion_js_1.LESSCompletion(), new cssHover_js_1.CSSHover(), new cssNavigation_js_1.CSSNavigation(), new cssCodeActions_js_1.CSSCodeActions(), new cssValidation_js_1.CSSValidation());
  }
  exports.getLESSLanguageService = getLESSLanguageService;
  

});
