import React from 'react';
import {Editor} from 'amis-editor';
import {inject, observer} from 'mobx-react';
import {IMainStore} from '../store';
import {RouteComponentProps} from 'react-router-dom';
import {Layout, Switch, classnames as cx, toast} from 'amis';
import '../renderer/MyRenderer';
import '../editor/MyRenderer';

let currentIndex = -1;

let host = `${window.location.protocol}//${window.location.host}`;
let iframeUrl = '/editor.html';

// 如果在 gh-pages 里面
if (/^\/amis-editor-demo/.test(window.location.pathname)) {
    host += '/amis-editor';
    iframeUrl = '/amis-editor-demo' + iframeUrl;
}

const schemaUrl = `${host}/schema.json`;

// @ts-ignore
__uri('amis/schema.json');

export default inject('store')(
    observer(function ({store, location, history, match}: {store: IMainStore} & RouteComponentProps<{id: string}>) {
        const index: number = parseInt(match.params.id, 10);

        if (index !== currentIndex) {
            currentIndex = index;
            store.updateSchema(store.pages[index].schema);
        }

        function save() {
            store.updatePageSchemaAt(index);
            toast.success('保存成功', '提示');
        }

        function exit() {
            history.push(`/${store.pages[index].path}`);
        }

        function renderHeader() {
            return (
                <div className="editor-header clearfix box-shadow bg-dark">
                    <div className="editor-preview">
                        预览{' '}
                        <Switch
                            value={store.preview}
                            onChange={(value: boolean) => store.setPreview(value)}
                            className="m-l-xs"
                            inline
                        />
                    </div>

                    <div className="editor-preview">
                        移动端{' '}
                        <Switch
                            value={store.isMobile}
                            onChange={(value: boolean) => store.setIsMobile(value)}
                            className="m-l-xs"
                            inline
                        />
                    </div>

                    <div className="editor-header-btns">
                        <div className={cx('btn-item')} onClick={save}>
                            保存
                        </div>

                        <div className="btn-item" onClick={exit}>
                            退出
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <Layout header={renderHeader()} headerFixed={false}>
                <Editor
                    theme={'cxd'}
                    preview={store.preview}
                    value={store.schema}
                    onChange={(value: any) => store.updateSchema(value)}
                    className="is-fixed"
                    $schemaUrl={schemaUrl}
                    iframeUrl={iframeUrl}
                    isMobile={store.isMobile}
                />
            </Layout>
        );
    })
);
