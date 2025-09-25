// 在保存按钮的点击事件中添加文件写入逻辑
const saveToLocal = async (json: string) => {
  const fs = require('fs'); // Node.js 文件模块
  const path = './src/pages/new-page.json';
  fs.writeFileSync(path, json);
  alert('页面已保存到本地！');
};