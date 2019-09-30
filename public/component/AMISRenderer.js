define('component/AMISRenderer.tsx', function(require, exports, module) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  var tslib_1 = require("node_modules/tslib/tslib");
  var react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  var react_router_1 = require("node_modules/react-router/index");
  var mobx_react_1 = require("node_modules/mobx-react/index");
  var mobx_state_tree_1 = require("node_modules/mobx-state-tree/dist/mobx-state-tree");
  var qs_1 = tslib_1.__importDefault(require("node_modules/qs/lib/index"));
  var amis_1 = require("node_modules/amis/lib/index");
  function schema2component(schema, transform, session) {
      if (session === void 0) { session = 'page'; }
      var SchemaRenderer = /** @class */ (function (_super) {
          tslib_1.__extends(SchemaRenderer, _super);
          function SchemaRenderer() {
              return _super !== null && _super.apply(this, arguments) || this;
          }
          SchemaRenderer.prototype.getEnv = function () {
              var _this = this;
              if (this.env) {
                  return this.env;
              }
              var props = this.props;
              var store = props.store;
              var rootEnv = mobx_state_tree_1.getEnv(store);
              var normalizeLink = function (to, preserveHash) {
                  if (/^\/api\//.test(to)) {
                      return to;
                  }
                  to = to || '';
                  var history = _this.props.history;
                  var location = history.location;
                  var currentQuery = qs_1.default.parse(location.search.substring(1));
                  to = amis_1.filter(to.replace(/\$\$/g, qs_1.default.stringify(currentQuery)), currentQuery);
                  if (to && to[0] === '#') {
                      to = location.pathname + location.search + to;
                  }
                  else if (to && to[0] === '?') {
                      to = location.pathname + to;
                  }
                  var idx = to.indexOf('?');
                  var idx2 = to.indexOf('#');
                  var pathname = ~idx ? to.substring(0, idx) : ~idx2 ? to.substring(0, idx2) : to;
                  var search = ~idx ? to.substring(idx, ~idx2 ? idx2 : undefined) : '';
                  var hash = ~idx2 ? to.substring(idx2) : preserveHash ? location.hash : '';
                  if (!pathname) {
                      pathname = location.pathname;
                  }
                  else if (pathname[0] != '/' && !/^\w+\:/.test(pathname)) {
                      var relativeBase = location.pathname;
                      var paths = relativeBase.split('/');
                      paths.pop();
                      var m = void 0;
                      while ((m = /^\.\.?\//.exec(pathname))) {
                          if (m[0] === '../') {
                              paths.pop();
                          }
                          pathname = pathname.substring(m[0].length);
                      }
                      pathname = paths.concat(pathname).join('/');
                  }
                  return pathname + search + hash;
              };
              var isCurrentUrl = function (to) {
                  var history = _this.props.history;
                  var link = normalizeLink(to);
                  var location = history.location;
                  var pathname = link;
                  var search = '';
                  var idx = link.indexOf('?');
                  if (~idx) {
                      pathname = link.substring(0, idx);
                      search = link.substring(idx);
                  }
                  if (search) {
                      if (pathname !== location.pathname || !location.search) {
                          return false;
                      }
                      var currentQuery_1 = qs_1.default.parse(location.search.substring(1));
                      var query_1 = qs_1.default.parse(search.substring(1));
                      return Object.keys(query_1).every(function (key) { return query_1[key] === currentQuery_1[key]; });
                  }
                  else if (pathname === location.pathname) {
                      return true;
                  }
                  return false;
              };
              return (this.env = tslib_1.__assign({}, rootEnv, { session: session,
                  isCurrentUrl: isCurrentUrl, updateLocation: props.updateLocation ||
                      (function (location, replace) {
                          var history = _this.props.history;
                          if (location === 'goBack') {
                              return history.goBack();
                          }
                          else if (/^https?\:\/\//.test(location)) {
                              return (window.location.href = location);
                          }
                          history[replace ? 'replace' : 'push'](normalizeLink(location, replace));
                      }), jumpTo: props.jumpTo ||
                      (function (to, action) {
                          var history = _this.props.history;
                          if (to === 'goBack') {
                              return history.goBack();
                          }
                          to = normalizeLink(to);
                          if (isCurrentUrl(to)) {
                              return;
                          }
                          if (action && action.actionType === 'url') {
                              action.blank === false ? (window.location.href = to) : window.open(to, '_blank');
                              return;
                          }
                          else if (action && action.blank) {
                              window.open(to, '_blank');
                              return;
                          }
                          if (/^https?:\/\//.test(to)) {
                              window.location.href = to;
                          }
                          else {
                              history.push(to);
                          }
                      }), affixOffsetTop: props.embedMode ? 0 : 50, theme: store.theme }));
          };
          SchemaRenderer.prototype.render = function () {
              var _a = this.props, router = _a.router, match = _a.match, location = _a.location, history = _a.history, store = _a.store, schemaProp = _a.schema, jumpTo = _a.jumpTo, updateLocation = _a.updateLocation, embedMode = _a.embedMode, rest = tslib_1.__rest(_a, ["router", "match", "location", "history", "store", "schema", "jumpTo", "updateLocation", "embedMode"]);
              var finalSchema = schemaProp || schema;
              var body;
              finalSchema.type || (finalSchema.type = 'page');
              body = amis_1.render(finalSchema, tslib_1.__assign({ location: location, data: amis_1.utils.createObject(tslib_1.__assign({}, match.params, { amisStore: store, pathname: location.pathname, params: match.params })) }, rest, { propsTransform: transform }), this.getEnv());
              return react_1.default.createElement(react_1.default.Fragment, null, body);
          };
          SchemaRenderer.displayName = 'SchemaRenderer';
          SchemaRenderer = tslib_1.__decorate([
              mobx_react_1.inject('store'),
              mobx_react_1.observer
          ], SchemaRenderer);
          return SchemaRenderer;
      }(react_1.default.Component));
      return react_router_1.withRouter(SchemaRenderer);
  }
  exports.schema2component = schema2component;
  exports.default = schema2component({ type: 'page', body: 'It works' });
  //# sourceMappingURL=/component/AMISRenderer.js.map
  

});
