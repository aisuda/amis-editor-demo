define('store/Page.ts', function(require, exports, module) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  var mobx_state_tree_1 = require("node_modules/mobx-state-tree/dist/mobx-state-tree");
  exports.PageStore = mobx_state_tree_1.types
      .model('Page', {
      id: mobx_state_tree_1.types.identifier,
      icon: '',
      path: '',
      label: '',
      schema: mobx_state_tree_1.types.frozen({})
  })
      .views(function (self) { return ({}); })
      .actions(function (self) {
      function updateSchema(schema) {
          self.schema = schema;
      }
      return {
          updateSchema: updateSchema
      };
  });
  //# sourceMappingURL=/store/Page.js.map
  

});
