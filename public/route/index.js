define('route/index.tsx', function(require, exports, module) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  var tslib_1 = require("node_modules/tslib/tslib");
  var react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  var amis_1 = require("node_modules/amis/lib/index");
  var react_router_dom_1 = require("node_modules/react-router-dom/index");
  var mobx_react_1 = require("node_modules/mobx-react/index");
  var Preview = react_1.default.lazy(function () { return Promise.resolve().then(function () { return new Promise(function(resolve){require(['route/Preview.tsx'], function(ret) {resolve(tslib_1.__importStar(ret));})}); }); });
  var Editor = react_1.default.lazy(function () { return Promise.resolve().then(function () { return new Promise(function(resolve){require(['route/Editor.tsx'], function(ret) {resolve(tslib_1.__importStar(ret));})}); }); });
  exports.default = mobx_react_1.observer(function (_a) {
      var store = _a.store;
      return (react_1.default.createElement(react_router_dom_1.HashRouter, null,
          react_1.default.createElement("div", { className: "routes-wrapper" },
              react_1.default.createElement(amis_1.ToastComponent, { key: "toast", position: 'top-right', theme: store.theme }),
              react_1.default.createElement(amis_1.AlertComponent, { key: "alert", theme: store.theme }),
              react_1.default.createElement(react_1.default.Suspense, { fallback: react_1.default.createElement(amis_1.Spinner, { overlay: true, className: "m-t-lg", size: "lg" }) },
                  react_1.default.createElement(react_router_dom_1.Switch, null,
                      react_1.default.createElement(react_router_dom_1.Redirect, { to: "/hello-world", from: "/", exact: true }),
                      react_1.default.createElement(react_router_dom_1.Route, { path: "/edit/:id", component: Editor }),
                      react_1.default.createElement(react_router_dom_1.Route, { component: Preview }))))));
  });
  //# sourceMappingURL=/route/index.js.map
  

});
