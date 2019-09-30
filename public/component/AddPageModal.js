define('component/AddPageModal.tsx', function(require, exports, module) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  var tslib_1 = require("node_modules/tslib/tslib");
  var AMISRenderer_1 = require("component/AMISRenderer.tsx");
  exports.default = AMISRenderer_1.schema2component({
      type: 'dialog',
      title: '新增页面',
      body: {
          type: 'form',
          controls: [
              {
                  type: 'text',
                  label: '名称',
                  name: 'label',
                  validations: {
                      maxLength: 20
                  },
                  required: true
              },
              {
                  type: 'text',
                  label: '路径',
                  name: 'path',
                  validations: {
                      isUrlPath: true
                  },
                  required: true,
                  validate: function (values, value) {
                      var exists = !!values.pages.filter(function (item) { return item.path === value; }).length;
                      return exists ? '当前路径已被占用，请换一个' : '';
                  }
              },
              {
                  type: 'icon-picker',
                  label: '图标',
                  name: 'icon'
              }
          ]
      }
  }, function (_a) {
      var onConfirm = _a.onConfirm, pages = _a.pages, rest = tslib_1.__rest(_a, ["onConfirm", "pages"]);
      return tslib_1.__assign({}, rest, { data: {
              pages: pages
          }, onConfirm: function (values) { return onConfirm && onConfirm(values[0]); } });
  });
  //# sourceMappingURL=/component/AddPageModal.js.map
  

});
