define('route/Editor.tsx', function(require, exports, module) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  var tslib_1 = require("node_modules/tslib/tslib");
  var react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  var amis_editor_1 = require("node_modules/@fex/amis-editor/lib/index");
  var mobx_react_1 = require("node_modules/mobx-react/index");
  var amis_1 = require("node_modules/amis/lib/index");
  var currentIndex = -1;
  exports.default = mobx_react_1.inject('store')(mobx_react_1.observer(function (_a) {
      var store = _a.store, location = _a.location, history = _a.history, match = _a.match;
      var index = parseInt(match.params.id, 10);
      if (index !== currentIndex) {
          currentIndex = index;
          store.updateSchema(store.pages[index].schema);
      }
      function save() {
          store.updatePageSchemaAt(index);
          amis_1.toast.success('保存成功', '提示');
      }
      function exit() {
          history.push("/" + store.pages[index].path);
      }
      function renderHeader() {
          return (react_1.default.createElement("div", { className: "editor-header clearfix box-shadow bg-dark" },
              react_1.default.createElement("div", { className: "navbar-brand text-lt font-thin" }, "AMis \u7F16\u8F91\u5668"),
              react_1.default.createElement("div", { className: "editor-preview" },
                  "\u9884\u89C8",
                  ' ',
                  react_1.default.createElement(amis_1.Switch, { value: store.preview, onChange: function (value) { return store.setPreview(value); }, className: "m-l-xs", inline: true })),
              react_1.default.createElement("div", { className: "editor-header-btns" },
                  react_1.default.createElement("div", { className: amis_1.classnames('btn-item'), onClick: save }, "\u4FDD\u5B58"),
                  react_1.default.createElement("div", { className: "btn-item", onClick: exit }, "\u9000\u51FA"))));
      }
      return (react_1.default.createElement(amis_1.Layout, { header: renderHeader() },
          react_1.default.createElement(amis_editor_1.Editor, { theme: 'default', preview: store.preview, value: store.schema, onChange: function (value) { return store.updateSchema(value); }, className: "is-fixed" })));
  }));
  //# sourceMappingURL=/route/Editor.js.map
  

});
