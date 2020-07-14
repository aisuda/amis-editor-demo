# amis-editor
amis 可视化编辑器


## 如何使用

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
