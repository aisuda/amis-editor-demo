import React from 'react';
import {RendererEditor, BasicEditor} from 'amis-editor';

@RendererEditor('my-renderer', {
  name: '自定义渲染器',
  description: '这只是个示例',
  // docLink: '/docs/renderers/Nav',
  type: 'my-renderer',
  previewSchema: {
    // 用来生成预览图的
    type: 'my-renderer',
    target: 'demo'
  },
  scaffold: {
    // 拖入组件里面时的初始数据
    type: 'my-renderer',
    target: '233'
  }
})
export default class MyRendererEditor extends BasicEditor {
  tipName = '自定义组件';
  settingsSchema = {
    title: '自定义组件配置',
    body: [
      {
        type: 'tabs',
        tabsMode: 'line',
        className: 'm-t-n-xs',
        contentClassName: 'no-border p-l-none p-r-none',
        tabs: [
          {
            title: '常规',
            controls: [
              {
                name: 'target',
                label: 'Target',
                type: 'text'
              }
            ]
          },

          {
            title: '外观',
            controls: []
          }
        ]
      }
    ]
  };

  // 配置表单一些简单的基本上够用了。
  // 还有一些逻辑可以复写来自定义的，但是我现在没时间写说明了。
}
