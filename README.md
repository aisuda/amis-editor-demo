# amis-editor

amis 可视化编辑器, 在线体验：http://fex-team.github.io/amis-editor

要使用编辑器必须熟悉 React，如果不了解建议使用[速搭](https://suda.baidu.com/)。

## 安装

```
npm i amis-editor
```

## 使用

```jsx
import {Editor} from 'amis-editor';


render() {
  return (
    <Editor
      {...props}
    />
  )
}
```

属性说明：

* `value: any` 值，amis 的json 配置。
* `onChange: (value: any) => void`。 当编辑器修改的时候会触发。
* `preview?: boolean` 是否为预览状态。
* `autoFocus?: boolean` 是否自动聚焦第一个可编辑的组件。


## 本地运行这个项目

1. 安装npm 依赖
2. `npm start` 开服务
3. `npm run dev` 开始编译，等编译出现时间信息后就可以刷新页面看效果了。


## 扩充自定义编辑器

如何扩充 amis 渲染器，请前往[如何注册自定义类型](https://baidu.github.io/amis/docs/custom#%E6%B3%A8%E5%86%8C%E8%87%AA%E5%AE%9A%E4%B9%89%E7%B1%BB%E5%9E%8B)，这里主要介绍如何把自定义的组件加入到编辑器里面来。

示例：

* ./renderer/MyRenderer.tsx
* ./editor/MyRenderer.tsx

首先，注册自定义组件的时候需要设置一个 `name` 属性，这个属性值应该是唯一的。后续注册编辑器是靠这个关联。

如本仓库中示例，name 值为 `my-renderer`。

```tsx
@Renderer({
  test: /\bmy-renderer$/,
  name: 'my-renderer'
})
export default class MyRenderer extends React.Component<MyRendererProps> {
  static defaultProps = {
    target: 'world'
  }

  render() {
    const {
      target
    } = this.props;

    return (
      <p>Hello {target}!</p>
    );
  }
}
```

然开开始注册编辑器。

```tsx
import {RendererEditor, BasicEditor} from 'amis-editor';

@RendererEditor('my-renderer', {
    name: '自定义渲染器',
    description: '这只是个示例',
    // docLink: '/docs/renderers/Nav',
    type: 'my-renderer', // 这个在 scaffold 没设置的时候有用。
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
        controls: [
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
}
```

然后直接看效果吧 https://github.com/fex-team/amis-editor 这里面插入的时候选择输入 my-renderer 然后就可以插入自定义的组件了。

## 使用协议

目前 amis-editor 未开源，但可以免费使用（包括商用）。
