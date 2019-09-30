define('index.tsx', function(require, exports, module) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  var tslib_1 = require("node_modules/tslib/tslib");
  /**
   * @file entry of this example.
   */
  var react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  var react_dom_1 = tslib_1.__importDefault(require("node_modules/react-dom/index"));
  var App_1 = tslib_1.__importDefault(require("App.tsx"));
  function bootstrap(mountTo) {
      react_dom_1.default.render(react_1.default.createElement(App_1.default, null), mountTo);
  }
  exports.bootstrap = bootstrap;
  //# sourceMappingURL=/index.js.map
  

});
