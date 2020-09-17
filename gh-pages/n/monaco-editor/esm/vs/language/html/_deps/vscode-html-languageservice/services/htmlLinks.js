define('a55007b', function(require, exports, module) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.findDocumentLinks = void 0;
  var tslib_1 = require("849c8c1");
  /*---------------------------------------------------------------------------------------------
   *  Copyright (c) Microsoft Corporation. All rights reserved.
   *  Licensed under the MIT License. See License.txt in the project root for license information.
   *--------------------------------------------------------------------------------------------*/
  var htmlScanner_js_1 = require("c2d9747");
  var main_js_1 = require("b1903ef");
  var strings = tslib_1.__importStar(require("99cd338"));
  var index_js_1 = tslib_1.__importDefault(require("63adda9"));
  var htmlLanguageTypes_js_1 = require("4ee499b");
  function normalizeRef(url, languageId) {
      var first = url[0];
      var last = url[url.length - 1];
      if (first === last && (first === '\'' || first === '\"')) {
          url = url.substr(1, url.length - 2);
      }
      return url;
  }
  function validateRef(url, languageId) {
      if (!url.length) {
          return false;
      }
      if (languageId === 'handlebars' && /{{.*}}/.test(url)) {
          return false;
      }
      try {
          return !!index_js_1.default.parse(url);
      }
      catch (e) {
          return false;
      }
  }
  function getWorkspaceUrl(documentUri, tokenContent, documentContext, base) {
      if (/^\s*javascript\:/i.test(tokenContent) || /^\s*\#/i.test(tokenContent) || /[\n\r]/.test(tokenContent)) {
          return null;
      }
      tokenContent = tokenContent.replace(/^\s*/g, '');
      if (/^https?:\/\//i.test(tokenContent) || /^file:\/\//i.test(tokenContent)) {
          // Absolute link that needs no treatment
          return tokenContent;
      }
      if (/^\/\//i.test(tokenContent)) {
          // Absolute link (that does not name the protocol)
          var pickedScheme = strings.startsWith(documentUri, 'https://') ? 'https' : 'http';
          return pickedScheme + ':' + tokenContent.replace(/^\s*/g, '');
      }
      if (documentContext) {
          return documentContext.resolveReference(tokenContent, base || documentUri);
      }
      return tokenContent;
  }
  function createLink(document, documentContext, attributeValue, startOffset, endOffset, base) {
      var tokenContent = normalizeRef(attributeValue, document.languageId);
      if (!validateRef(tokenContent, document.languageId)) {
          return null;
      }
      if (tokenContent.length < attributeValue.length) {
          startOffset++;
          endOffset--;
      }
      var workspaceUrl = getWorkspaceUrl(document.uri, tokenContent, documentContext, base);
      if (!workspaceUrl || !isValidURI(workspaceUrl)) {
          return null;
      }
      return {
          range: main_js_1.Range.create(document.positionAt(startOffset), document.positionAt(endOffset)),
          target: workspaceUrl
      };
  }
  function isValidURI(uri) {
      try {
          index_js_1.default.parse(uri);
          return true;
      }
      catch (e) {
          return false;
      }
  }
  function findDocumentLinks(document, documentContext) {
      var newLinks = [];
      var rootAbsoluteUrl = null;
      var scanner = htmlScanner_js_1.createScanner(document.getText(), 0);
      var token = scanner.scan();
      var afterHrefOrSrc = false;
      var afterBase = false;
      var base = void 0;
      while (token !== htmlLanguageTypes_js_1.TokenType.EOS) {
          switch (token) {
              case htmlLanguageTypes_js_1.TokenType.StartTag:
                  if (!base) {
                      var tagName = scanner.getTokenText().toLowerCase();
                      afterBase = tagName === 'base';
                  }
                  break;
              case htmlLanguageTypes_js_1.TokenType.AttributeName:
                  var attributeName = scanner.getTokenText().toLowerCase();
                  afterHrefOrSrc = attributeName === 'src' || attributeName === 'href';
                  break;
              case htmlLanguageTypes_js_1.TokenType.AttributeValue:
                  if (afterHrefOrSrc) {
                      var attributeValue = scanner.getTokenText();
                      if (!afterBase) { // don't highlight the base link itself
                          var link = createLink(document, documentContext, attributeValue, scanner.getTokenOffset(), scanner.getTokenEnd(), base);
                          if (link) {
                              newLinks.push(link);
                          }
                      }
                      if (afterBase && typeof base === 'undefined') {
                          base = normalizeRef(attributeValue, document.languageId);
                          if (base && documentContext) {
                              base = documentContext.resolveReference(base, document.uri);
                          }
                      }
                      afterBase = false;
                      afterHrefOrSrc = false;
                  }
                  break;
          }
          token = scanner.scan();
      }
      return newLinks;
  }
  exports.findDocumentLinks = findDocumentLinks;
  //# sourceMappingURL=htmlLinks.js.map
  

});
