# amis-editor-demo

amis 可视化编辑器, 在线体验：https://aisuda.github.io/amis-editor-demo

要使用编辑器必须熟悉 React，如果不了解建议使用[速搭](https://aisuda.baidu.com/)。

## 本地运行这个项目

1. `npm i` 安装依赖
2. `npm start` 开服务
3. `npm run dev` 开始编译，等编译出现时间信息后就可以刷新页面看效果了。

## 在其他项目中使用 amis-editor

```
npm i amis-editor
```

使用 方法

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

-   `value: any` 值，amis 的 json 配置。
-   `onChange: (value: any) => void`。 当编辑器修改的时候会触发。
-   `preview?: boolean` 是否为预览状态。
-   `autoFocus?: boolean` 是否自动聚焦第一个可编辑的组件。
-   `plugins` 插件类集合

## 扩充自定义编辑器（旧版）

如何扩充 amis 渲染器，请前往[如何注册自定义类型](https://baidu.github.io/amis/docs/start/custom#%E6%B3%A8%E5%86%8C%E8%87%AA%E5%AE%9A%E4%B9%89%E7%B1%BB%E5%9E%8B)，这里主要介绍如何把自定义的组件加入到编辑器里面来。

示例：

-   ./renderer/MyRenderer.tsx
-   ./editor/MyRenderer.tsx

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
    };

    render() {
        const {target} = this.props;

        return <p>Hello {target}!</p>;
    }
}
```

然后开始注册编辑器。

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
}
```

然后直接看效果吧 https://github.com/fex-team/amis-editor 这里面插入的时候选择输入 my-renderer 然后就可以插入自定义的组件了。

## 扩充自定义编辑器（新版）

amis-editor 重构了一版，之前定义注册自定义组件的方式也能用，但是已经标记了 `deprecated`，新的添加自定义编辑器的方式有两种。

1. registerEditorPlugin 注册全局插件。
2. 不注册，但是调用 `<Editor>` 的时候时候通过 `plugins` 属性传入。

效果都一样，重点还是怎么写个 Plugin，示例：

```tsx
import {BasePlugin} from 'amis-editor';

export class MyRendererPlugin extends BasePlugin {
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
```

定义好 plugin 后，可以有两种方式启用。

```tsx
// 方式 1，注册默认插件，所有编辑器实例都会自动实例话。
import {registerEditorPlugin} from 'amis-editor';

registerEditorPlugin(MyRendererPlugin);

// 方式2，只让某些编辑器启用
() => <Editor plugins={[MyRendererPlugin]} />;
```

前面的示例只做了简单的说明，可用属性还有, 具体还是先看 npm 包里面的 .d.ts 文件吧，后面再补充更详细的文档。

```tsx
export interface PluginEventListener {
    onActive?: (event: PluginEvent<ActiveEventContext>) => void;

    /**
     * 事件，当有配置项插入前调用。通过 event.preventDefault() 可以干预。
     */
    beforeInsert?: (event: PluginEvent<InsertEventContext>) => false | void;
    afterInsert?: (event: PluginEvent<InsertEventContext>) => void;

    /**
     * 面板里面编辑修改的事件。
     */
    beforeUpdate?: (event: PluginEvent<ChangeEventContext>) => false | void;
    afterUpdate?: (event: PluginEvent<ChangeEventContext>) => void;

    /**
     * 更新渲染器，或者右键粘贴配置。
     */
    beforeReplace?: (event: PluginEvent<ReplaceEventContext>) => false | void;
    afterReplace?: (event: PluginEvent<ReplaceEventContext>) => void;

    /**
     * 移动节点的时候触发，包括上移，下移
     */
    beforeMove?: (event: PluginEvent<MoveEventContext>) => false | void;
    aftterMove?: (event: PluginEvent<MoveEventContext>) => void;

    /**
     * 删除的时候触发
     */
    beforeDelete?: (event: PluginEvent<BaseEventContext>) => false | void;
    afterDelete?: (event: PluginEvent<BaseEventContext>) => void;

    beforeResolveEditorInfo?: (event: PluginEvent<RendererInfoResolveEventContext>) => false | void;
    afterResolveEditorInfo?: (event: PluginEvent<RendererInfoResolveEventContext>) => void;

    beforeResolveJsonSchema?: (event: PluginEvent<RendererJSONSchemaResolveEventContext>) => false | void;
    afterResolveJsonSchema?: (event: PluginEvent<RendererJSONSchemaResolveEventContext>) => void;

    onDndAccept?: (event: PluginEvent<DragEventContext>) => false | void;

    onBuildPanels?: (event: PluginEvent<BuildPanelEventContext>) => void;

    onBuildContextMenus?: (event: PluginEvent<ContextMenuEventContext>) => void;

    onPreventClick?: (event: PluginEvent<PreventClickEventContext>) => false | void;
}

/**
 * 插件的 interface 定义
 */
export interface PluginInterface extends Partial<BasicRendererInfo>, Partial<BasicSubRenderInfo>, PluginEventListener {
    readonly manager: EditorManager;

    order?: number;

    /**
     * 渲染器的名字，关联后不用自己实现 getRendererInfo 了。
     */
    rendererName?: string;

    /**
     * 默认的配置面板信息
     */
    panelIcon?: string;
    panelTitle?: string;
    panelControls?: Array<any>;
    panelDefinitions?: any;
    panelApi?: any;
    panelSubmitOnChange?: boolean;
    panelControlsCreator?: (context: BaseEventContext) => Array<any>;

    /**
     * 返回渲染器信息。不是每个插件都需要。
     */
    getRendererInfo?: (context: RendererInfoResolveEventContext) => BasicRendererInfo | void;

    /**
     * 生成节点的 JSON Schema 的 uri 地址。
     */
    buildJSONSchema?: (context: RendererJSONSchemaResolveEventContext) => void | string;

    /**
     * 构建右上角功能按钮集合
     */
    buildEditorToolbar?: (context: BaseEventContext, toolbars: Array<BasicToolbarItem>) => void;

    /**
     * 构建右键菜单项
     */
    buildEditorContextMenu?: (context: ContextMenuEventContext, menus: Array<ContextMenuItem>) => void;

    /**
     * 构建编辑器面板。
     */
    buildEditorPanel?: (context: BaseEventContext, panels: Array<BasicPanelItem>) => void;

    /**
     * 构建子渲染器信息集合。
     */
    buildSubRenderers?: (
        context: RendererEventContext,
        subRenderers: Array<SubRendererInfo>,
        renderers: Array<RendererConfig>
    ) => BasicSubRenderInfo | Array<BasicSubRenderInfo> | void;
}
```

## 使用协议

目前 amis-editor 未开源，但可以免费使用（包括商用）。

近期 amis-editor 项目将会拆分，将 plugins 开源，方便进行调整。
