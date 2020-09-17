define('c8c7fe4', function(require, exports, module) {

  /*---------------------------------------------------------------------------------------------
   *  Copyright (c) Microsoft Corporation. All rights reserved.
   *  Licensed under the MIT License. See License.txt in the project root for license information.
   *--------------------------------------------------------------------------------------------*/
  'use strict';
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.CSSCodeActions = void 0;
  var tslib_1 = require("849c8c1");
  var nodes = tslib_1.__importStar(require("0b0187d"));
  var languageFacts = tslib_1.__importStar(require("4b90411"));
  var strings_js_1 = require("04c8348");
  var lintRules_js_1 = require("919d479");
  var main_js_1 = require("6b31927");
  var nls = tslib_1.__importStar(require("da3a483"));
  var localize = nls.loadMessageBundle();
  var CSSCodeActions = /** @class */ (function () {
      function CSSCodeActions() {
      }
      CSSCodeActions.prototype.doCodeActions = function (document, range, context, stylesheet) {
          return this.doCodeActions2(document, range, context, stylesheet).map(function (ca) {
              return main_js_1.Command.create(ca.title, '_css.applyCodeAction', document.uri, document.version, ca.edit.documentChanges[0].edits);
          });
      };
      CSSCodeActions.prototype.doCodeActions2 = function (document, range, context, stylesheet) {
          var result = [];
          if (context.diagnostics) {
              for (var _i = 0, _a = context.diagnostics; _i < _a.length; _i++) {
                  var diagnostic = _a[_i];
                  this.appendFixesForMarker(document, stylesheet, diagnostic, result);
              }
          }
          return result;
      };
      CSSCodeActions.prototype.getFixesForUnknownProperty = function (document, property, marker, result) {
          var propertyName = property.getName();
          var candidates = [];
          languageFacts.cssDataManager.getProperties().forEach(function (p) {
              var score = strings_js_1.difference(propertyName, p.name);
              if (score >= propertyName.length / 2 /*score_lim*/) {
                  candidates.push({ property: p.name, score: score });
              }
          });
          // Sort in descending order.
          candidates.sort(function (a, b) {
              return b.score - a.score;
          });
          var maxActions = 3;
          for (var _i = 0, candidates_1 = candidates; _i < candidates_1.length; _i++) {
              var candidate = candidates_1[_i];
              var propertyName_1 = candidate.property;
              var title = localize('css.codeaction.rename', "Rename to '{0}'", propertyName_1);
              var edit = main_js_1.TextEdit.replace(marker.range, propertyName_1);
              var documentIdentifier = main_js_1.VersionedTextDocumentIdentifier.create(document.uri, document.version);
              var workspaceEdit = { documentChanges: [main_js_1.TextDocumentEdit.create(documentIdentifier, [edit])] };
              var codeAction = main_js_1.CodeAction.create(title, workspaceEdit, main_js_1.CodeActionKind.QuickFix);
              codeAction.diagnostics = [marker];
              result.push(codeAction);
              if (--maxActions <= 0) {
                  return;
              }
          }
      };
      CSSCodeActions.prototype.appendFixesForMarker = function (document, stylesheet, marker, result) {
          if (marker.code !== lintRules_js_1.Rules.UnknownProperty.id) {
              return;
          }
          var offset = document.offsetAt(marker.range.start);
          var end = document.offsetAt(marker.range.end);
          var nodepath = nodes.getNodePath(stylesheet, offset);
          for (var i = nodepath.length - 1; i >= 0; i--) {
              var node = nodepath[i];
              if (node instanceof nodes.Declaration) {
                  var property = node.getProperty();
                  if (property && property.offset === offset && property.end === end) {
                      this.getFixesForUnknownProperty(document, property, marker, result);
                      return;
                  }
              }
          }
      };
      return CSSCodeActions;
  }());
  exports.CSSCodeActions = CSSCodeActions;
  

});
