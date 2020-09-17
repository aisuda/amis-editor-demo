define('3607d51', function(require, exports, module) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.ClientCapabilities = exports.ErrorCode = exports.SelectionRangeKind = exports.FoldingRangeKind = exports.FoldingRange = exports.ColorPresentation = exports.ColorInformation = exports.Color = exports.TextEdit = exports.Range = void 0;
  var main_js_1 = require("4872c6c");
  Object.defineProperty(exports, "Range", { enumerable: true, get: function () { return main_js_1.Range; } });
  Object.defineProperty(exports, "TextEdit", { enumerable: true, get: function () { return main_js_1.TextEdit; } });
  Object.defineProperty(exports, "Color", { enumerable: true, get: function () { return main_js_1.Color; } });
  Object.defineProperty(exports, "ColorInformation", { enumerable: true, get: function () { return main_js_1.ColorInformation; } });
  Object.defineProperty(exports, "ColorPresentation", { enumerable: true, get: function () { return main_js_1.ColorPresentation; } });
  Object.defineProperty(exports, "FoldingRange", { enumerable: true, get: function () { return main_js_1.FoldingRange; } });
  Object.defineProperty(exports, "FoldingRangeKind", { enumerable: true, get: function () { return main_js_1.FoldingRangeKind; } });
  (function (SelectionRangeKind) {
      /**
       * Empty Kind.
       */
      SelectionRangeKind["Empty"] = "";
      /**
       * The statment kind, its value is `statement`, possible extensions can be
       * `statement.if` etc
       */
      SelectionRangeKind["Statement"] = "statement";
      /**
       * The declaration kind, its value is `declaration`, possible extensions can be
       * `declaration.function`, `declaration.class` etc.
       */
      SelectionRangeKind["Declaration"] = "declaration";
  })(exports.SelectionRangeKind || (exports.SelectionRangeKind = {}));
  (function (ErrorCode) {
      ErrorCode[ErrorCode["Undefined"] = 0] = "Undefined";
      ErrorCode[ErrorCode["EnumValueMismatch"] = 1] = "EnumValueMismatch";
      ErrorCode[ErrorCode["UnexpectedEndOfComment"] = 257] = "UnexpectedEndOfComment";
      ErrorCode[ErrorCode["UnexpectedEndOfString"] = 258] = "UnexpectedEndOfString";
      ErrorCode[ErrorCode["UnexpectedEndOfNumber"] = 259] = "UnexpectedEndOfNumber";
      ErrorCode[ErrorCode["InvalidUnicode"] = 260] = "InvalidUnicode";
      ErrorCode[ErrorCode["InvalidEscapeCharacter"] = 261] = "InvalidEscapeCharacter";
      ErrorCode[ErrorCode["InvalidCharacter"] = 262] = "InvalidCharacter";
      ErrorCode[ErrorCode["PropertyExpected"] = 513] = "PropertyExpected";
      ErrorCode[ErrorCode["CommaExpected"] = 514] = "CommaExpected";
      ErrorCode[ErrorCode["ColonExpected"] = 515] = "ColonExpected";
      ErrorCode[ErrorCode["ValueExpected"] = 516] = "ValueExpected";
      ErrorCode[ErrorCode["CommaOrCloseBacketExpected"] = 517] = "CommaOrCloseBacketExpected";
      ErrorCode[ErrorCode["CommaOrCloseBraceExpected"] = 518] = "CommaOrCloseBraceExpected";
      ErrorCode[ErrorCode["TrailingComma"] = 519] = "TrailingComma";
      ErrorCode[ErrorCode["DuplicateKey"] = 520] = "DuplicateKey";
      ErrorCode[ErrorCode["CommentNotPermitted"] = 521] = "CommentNotPermitted";
      ErrorCode[ErrorCode["SchemaResolveError"] = 768] = "SchemaResolveError";
  })(exports.ErrorCode || (exports.ErrorCode = {}));
  (function (ClientCapabilities) {
      ClientCapabilities.LATEST = {
          textDocument: {
              completion: {
                  completionItem: {
                      documentationFormat: [main_js_1.MarkupKind.Markdown, main_js_1.MarkupKind.PlainText]
                  }
              }
          }
      };
  })(exports.ClientCapabilities || (exports.ClientCapabilities = {}));
  

});
