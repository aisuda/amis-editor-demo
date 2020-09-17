define('c31477e', function(require, exports, module) {

  /*---------------------------------------------------------------------------------------------
   *  Copyright (c) Microsoft Corporation. All rights reserved.
   *  Licensed under the MIT License. See License.txt in the project root for license information.
   *--------------------------------------------------------------------------------------------*/
  'use strict';
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.SCSSParseError = exports.SCSSIssueType = void 0;
  var tslib_1 = require("849c8c1");
  var nls = tslib_1.__importStar(require("da3a483"));
  var localize = nls.loadMessageBundle();
  var SCSSIssueType = /** @class */ (function () {
      function SCSSIssueType(id, message) {
          this.id = id;
          this.message = message;
      }
      return SCSSIssueType;
  }());
  exports.SCSSIssueType = SCSSIssueType;
  exports.SCSSParseError = {
      FromExpected: new SCSSIssueType('scss-fromexpected', localize('expected.from', "'from' expected")),
      ThroughOrToExpected: new SCSSIssueType('scss-throughexpected', localize('expected.through', "'through' or 'to' expected")),
      InExpected: new SCSSIssueType('scss-fromexpected', localize('expected.in', "'in' expected")),
  };
  

});
