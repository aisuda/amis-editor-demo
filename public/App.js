define('App.tsx', function(require, exports, module) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  var tslib_1 = require("node_modules/tslib/tslib");
  var react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  var mobx_react_1 = require("node_modules/mobx-react/index");
  var amis_1 = require("node_modules/amis/lib/index");
  var axios_1 = tslib_1.__importDefault(require("node_modules/axios/index"));
  var index_1 = require("store/index.ts");
  var index_2 = tslib_1.__importDefault(require("route/index.tsx"));
  var copy_to_clipboard_1 = tslib_1.__importDefault(require("node_modules/copy-to-clipboard/index"));
  function default_1() {
      var store = (window.store = index_1.MainStore.create({}, {
          fetcher: function (_a) {
              var url = _a.url, method = _a.method, data = _a.data, config = _a.config;
              config = config || {};
              config.headers = config.headers || {};
              config.withCredentials = true;
              if (method !== 'post' && method !== 'put' && method !== 'patch') {
                  if (data) {
                      config.params = data;
                  }
                  return axios_1.default[method](url, config);
              }
              else if (data && data instanceof FormData) {
                  // config.headers = config.headers || {};
                  // config.headers['Content-Type'] = 'multipart/form-data';
              }
              else if (data &&
                  typeof data !== 'string' &&
                  !(data instanceof Blob) &&
                  !(data instanceof ArrayBuffer)) {
                  data = JSON.stringify(data);
                  config.headers['Content-Type'] = 'application/json';
              }
              return axios_1.default[method](url, data, config);
          },
          isCancel: function (e) { return axios_1.default.isCancel(e); },
          notify: function (type, msg) {
              amis_1.toast[type]
                  ? amis_1.toast[type](msg, type === 'error' ? '系统错误' : '系统消息')
                  : console.warn('[Notify]', type, msg);
              console.log('[notify]', type, msg);
          },
          alert: amis_1.alert,
          confirm: amis_1.confirm,
          copy: function (contents, options) {
              if (options === void 0) { options = {}; }
              var ret = copy_to_clipboard_1.default(contents, options);
              ret && (!options || options.shutup !== true) && amis_1.toast.info('内容已拷贝到剪切板');
              return ret;
          }
      }));
      return (react_1.default.createElement(mobx_react_1.Provider, { store: store },
          react_1.default.createElement(index_2.default, { store: store })));
  }
  exports.default = default_1;
  //# sourceMappingURL=/App.js.map
  

});
