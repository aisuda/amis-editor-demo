define('5067f53', function(require, exports, module) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.JSONValidation = void 0;
  var tslib_1 = require("849c8c1");
  /*---------------------------------------------------------------------------------------------
   *  Copyright (c) Microsoft Corporation. All rights reserved.
   *  Licensed under the MIT License. See License.txt in the project root for license information.
   *--------------------------------------------------------------------------------------------*/
  var jsonSchemaService_js_1 = require("829557b");
  var main_js_1 = require("4872c6c");
  var jsonLanguageTypes_js_1 = require("3607d51");
  var nls = tslib_1.__importStar(require("a22b28e"));
  var localize = nls.loadMessageBundle();
  var JSONValidation = /** @class */ (function () {
      function JSONValidation(jsonSchemaService, promiseConstructor) {
          this.jsonSchemaService = jsonSchemaService;
          this.promise = promiseConstructor;
          this.validationEnabled = true;
      }
      JSONValidation.prototype.configure = function (raw) {
          if (raw) {
              this.validationEnabled = raw.validate;
              this.commentSeverity = raw.allowComments ? void 0 : main_js_1.DiagnosticSeverity.Error;
          }
      };
      JSONValidation.prototype.doValidation = function (textDocument, jsonDocument, documentSettings, schema) {
          var _this = this;
          if (!this.validationEnabled) {
              return this.promise.resolve([]);
          }
          var diagnostics = [];
          var added = {};
          var addProblem = function (problem) {
              // remove duplicated messages
              var signature = problem.range.start.line + ' ' + problem.range.start.character + ' ' + problem.message;
              if (!added[signature]) {
                  added[signature] = true;
                  diagnostics.push(problem);
              }
          };
          var getDiagnostics = function (schema) {
              var trailingCommaSeverity = documentSettings ? toDiagnosticSeverity(documentSettings.trailingCommas) : main_js_1.DiagnosticSeverity.Error;
              var commentSeverity = documentSettings ? toDiagnosticSeverity(documentSettings.comments) : _this.commentSeverity;
              if (schema) {
                  if (schema.errors.length && jsonDocument.root) {
                      var astRoot = jsonDocument.root;
                      var property = astRoot.type === 'object' ? astRoot.properties[0] : null;
                      if (property && property.keyNode.value === '$schema') {
                          var node = property.valueNode || property;
                          var range = main_js_1.Range.create(textDocument.positionAt(node.offset), textDocument.positionAt(node.offset + node.length));
                          addProblem(main_js_1.Diagnostic.create(range, schema.errors[0], main_js_1.DiagnosticSeverity.Warning, jsonLanguageTypes_js_1.ErrorCode.SchemaResolveError));
                      }
                      else {
                          var range = main_js_1.Range.create(textDocument.positionAt(astRoot.offset), textDocument.positionAt(astRoot.offset + 1));
                          addProblem(main_js_1.Diagnostic.create(range, schema.errors[0], main_js_1.DiagnosticSeverity.Warning, jsonLanguageTypes_js_1.ErrorCode.SchemaResolveError));
                      }
                  }
                  else {
                      var semanticErrors = jsonDocument.validate(textDocument, schema.schema);
                      if (semanticErrors) {
                          semanticErrors.forEach(addProblem);
                      }
                  }
                  if (schemaAllowsComments(schema.schema)) {
                      trailingCommaSeverity = commentSeverity = void 0;
                  }
              }
              for (var _i = 0, _a = jsonDocument.syntaxErrors; _i < _a.length; _i++) {
                  var p = _a[_i];
                  if (p.code === jsonLanguageTypes_js_1.ErrorCode.TrailingComma) {
                      if (typeof trailingCommaSeverity !== 'number') {
                          continue;
                      }
                      p.severity = trailingCommaSeverity;
                  }
                  addProblem(p);
              }
              if (typeof commentSeverity === 'number') {
                  var message_1 = localize('InvalidCommentToken', 'Comments are not permitted in JSON.');
                  jsonDocument.comments.forEach(function (c) {
                      addProblem(main_js_1.Diagnostic.create(c, message_1, commentSeverity, jsonLanguageTypes_js_1.ErrorCode.CommentNotPermitted));
                  });
              }
              return diagnostics;
          };
          if (schema) {
              var id = schema.id || ('schemaservice://untitled/' + idCounter++);
              return this.jsonSchemaService.resolveSchemaContent(new jsonSchemaService_js_1.UnresolvedSchema(schema), id, {}).then(function (resolvedSchema) {
                  return getDiagnostics(resolvedSchema);
              });
          }
          return this.jsonSchemaService.getSchemaForResource(textDocument.uri, jsonDocument).then(function (schema) {
              return getDiagnostics(schema);
          });
      };
      return JSONValidation;
  }());
  exports.JSONValidation = JSONValidation;
  var idCounter = 0;
  function schemaAllowsComments(schemaRef) {
      if (schemaRef && typeof schemaRef === 'object') {
          if (schemaRef.allowComments) {
              return true;
          }
          if (schemaRef.allOf) {
              return schemaRef.allOf.some(schemaAllowsComments);
          }
      }
      return false;
  }
  function toDiagnosticSeverity(severityLevel) {
      switch (severityLevel) {
          case 'error': return main_js_1.DiagnosticSeverity.Error;
          case 'warning': return main_js_1.DiagnosticSeverity.Warning;
          case 'ignore': return void 0;
      }
      return void 0;
  }
  

});
