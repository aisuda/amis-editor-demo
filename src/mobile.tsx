import React from 'react';
import ReactDOM from 'react-dom';
import {mountInIframe} from 'amis-editor-core';
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/css/v4-shims.css';
import 'amis/lib/themes/default.css';
import 'amis-editor-core/lib/style.css';

// 导入自定义组件
import './renderer/MyRenderer';

mountInIframe(document.getElementById('root') as HTMLElement, ReactDOM);
