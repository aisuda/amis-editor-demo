define('b3e3fff', function(require, exports, module) {

  /*---------------------------------------------------------------------------------------------
   *  Copyright (c) Microsoft Corporation. All rights reserved.
   *  Licensed under the MIT License. See License.txt in the project root for license information.
   *--------------------------------------------------------------------------------------------*/
  'use strict';
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.CSSValidation = void 0;
  var tslib_1 = require("849c8c1");
  var nodes = tslib_1.__importStar(require("0b0187d"));
  var main_js_1 = require("6b31927");
  var lintRules_js_1 = require("919d479");
  var lint_js_1 = require("5e68366");
  var CSSValidation = /** @class */ (function () {
      function CSSValidation() {
      }
      CSSValidation.prototype.configure = function (settings) {
          this.settings = settings;
      };
      CSSValidation.prototype.doValidation = function (document, stylesheet, settings) {
          if (settings === void 0) {
              settings = this.settings;
          }
          if (settings && settings.validate === false) {
              return [];
          }
          var entries = [];
          entries.push.apply(entries, nodes.ParseErrorCollector.entries(stylesheet));
          entries.push.apply(entries, lint_js_1.LintVisitor.entries(stylesheet, document, new lintRules_js_1.LintConfigurationSettings(settings && settings.lint)));
          var ruleIds = [];
          for (var r in lintRules_js_1.Rules) {
              ruleIds.push(lintRules_js_1.Rules[r].id);
          }
          function toDiagnostic(marker) {
              var range = main_js_1.Range.create(document.positionAt(marker.getOffset()), document.positionAt(marker.getOffset() + marker.getLength()));
              var source = document.languageId;
              return {
                  code: marker.getRule().id,
                  source: source,
                  message: marker.getMessage(),
                  severity: marker.getLevel() === nodes.Level.Warning ? main_js_1.DiagnosticSeverity.Warning : main_js_1.DiagnosticSeverity.Error,
                  range: range
              };
          }
          return entries.filter(function (entry) { return entry.getLevel() !== nodes.Level.Ignore; }).map(toDiagnostic);
      };
      return CSSValidation;
  }());
  exports.CSSValidation = CSSValidation;
  

});
