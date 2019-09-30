define('route/NotFound.tsx', function(require, exports, module) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  var tslib_1 = require("node_modules/tslib/tslib");
  var react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  var react_router_dom_1 = require("node_modules/react-router-dom/index");
  var amis_1 = require("node_modules/amis/lib/index");
  exports.default = (function () { return (react_1.default.createElement(amis_1.NotFound, { links: react_1.default.createElement(react_router_dom_1.Link, { to: "/", className: "list-group-item" },
          react_1.default.createElement("i", { className: "fa fa-chevron-right text-muted" }),
          react_1.default.createElement("i", { className: "fa fa-fw fa-mail-forward m-r-xs" }),
          "\u53BB\u9996\u9875"), footerText: '' })); });
  //# sourceMappingURL=/route/NotFound.js.map
  

});
