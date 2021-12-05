import { BasePlugin, registerEditorPlugin } from "amis-editor";

export class  MyRendererPlugin extends BasePlugin {
  rendererName = 'my-renderer';

  // 暂时只支持这个，配置后会开启代码编辑器
  $schema = '/schemas/UnkownSchema.json'; 

  // 用来配置名称和描述
  name = '自定义渲染器';
  description = '这只是个示例';

  // tag，决定会在哪个 tab 下面显示的
  tags = ['自定义', '表单项'];

  // 图标
  icon = 'fa fa-user';

  // 用来生成预览图的
  previewSchema = {
    type: 'my-renderer',
    target: 'demo'
  };

  // 拖入组件里面时的初始数据
  scaffold = {
    type: 'my-renderer',
    target: '233'
  };

  // 右侧面板相关
  panelTitle = '自定义组件';
  panelControls = [
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
  ];
}

registerEditorPlugin(MyRendererPlugin);
