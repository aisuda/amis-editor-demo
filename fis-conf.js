const Resource = fis.require('postpackager-loader/lib/resource.js');

Resource.extend({
    buildResourceMap: function () {
        return 'amis.' + this.__super();
    },

    calculate: function () {
        this.__super.apply(this);

        // 标记这个文件，肯定是异步资源，即便是同步加载了。
        Object.keys(this.loaded).forEach(id => {
            const file = this.getFileById(id);

            if (file && file.subpath === '/examples/loadMonacoEditor.ts') {
                this.loaded[id] = true;
            }
        });
    }
});

const packConfig = {
    'pkg/npm.js': [
        '/mod.js',
        'node_modules/**.js',
        '!monaco-editor/**',
        '!flv.js/**',
        '!hls.js/**',
        '!amis/lib/editor/**',
        '!froala-editor/**',
        '!amis/lib/components/RichText.js',
        '!jquery/**',
        '!zrender/**',
        '!echarts/**',
        '!amis-editor/**'
    ],
    'pkg/rich-text.js': [
        '/mod.js',
        'amis/lib/components/RichText.js',
        'froala-editor/**',
        'jquery/**'
    ],
    'pkg/echarts.js': ['zrender/**', 'echarts/**'],
    'pkg/api-mock.js': ['mock/*.ts'],
    'pkg/app.js': ['/App.tsx', '/App.tsx:deps'],
    'pkg/rest.js': [
        '**.{js,jsx,ts,tsx}',
        '!static/mod.js',
        '!monaco-editor/**',
        '!echarts/**',
        '!flv.js/**',
        '!hls.js/**',
        '!froala-editor/**',
        '!jquery/**',
        '!amis/lib/components/RichText.js',
        '!zrender/**',
        '!echarts/**',
        '!amis-editor/**'
    ],
    // css 打包
    'pkg/style.css': [
        'node_modules/*/**.css',
        '*.scss',
        '!/scss/*.scss',
        '/scss/*.scss',
        '!monaco-editor/**'
    ]
};

fis.get('project.ignore').push('public/**', 'gh-pages/**');

// 配置只编译哪些文件。

fis.set('project.files', ['*.html', 'mock/**']);

fis.match('/icons/**.svg', {
    rExt: '.js',
    isJsXLike: true,
    isJsLike: true,
    isMod: true,
    parser: [
        fis.plugin('svgr', {
            svgProps: {
                className: 'icon'
            },
            prettier: false,
            dimensions: false
        }),
        fis.plugin('typescript', {
            importHelpers: true,
            esModuleInterop: true,
            experimentalDecorators: true,
            sourceMap: false
        })
    ]
});

fis.match('/mock/**.{json,js,conf}', {
    // isMod: false,
    useCompile: false
});

fis.match('*.scss', {
    parser: fis.plugin('sass', {
        sourceMap: true
    }),
    rExt: '.css'
});

fis.match('_*.scss', {
    release: false
});

fis.match('/node_modules/**.js', {
    isMod: true
});

fis.match('amis/schema.json', {
    release: '/schema.json'
});

fis.match('markdown-it/**.js', {
    preprocessor: fis.plugin('js-require-file')
});

fis.match('*.{jsx,tsx,ts}', {
    parser: [
        fis.plugin('typescript', {
            importHelpers: true,
            experimentalDecorators: true,
            sourceMap: true,
            esModuleInterop: true
        }),

        function (contents, file) {
            if (typeof contents !== 'string') {
                return contents;
            }

            // dynamic import 支持
            contents = contents.replace(
                /return\s+(tslib_\d+)\.__importStar\(require\(('|")(.*?)\2\)\);/g,
                function (_, tslib, quto, value) {
                    return `return new Promise(function(resolve){require(['${value}'], function(ret) {resolve(${tslib}.__importStar(ret));})});`;
                }
            );

            return contents;
        }
    ],
    preprocessor: fis.plugin('js-require-css'),
    isMod: true,
    rExt: '.js'
});

fis.match('amis/**.js', {
    preprocessor: fis.plugin('js-require-css')
});

fis.match('tinymce/{tinymce.js,plugins/**.js,themes/silver/theme.js}', {
    ignoreDependencies: true
});

fis.match('tinymce/plugins/*/index.js', {
    ignoreDependencies: false
});

// 这些用了 esm
fis.match('{echarts/extension/**.js, zrender/**.js}', {
    parser: fis.plugin('typescript', {
        sourceMap: true,
        importHelpers: true,
        esModuleInterop: true,
        emitDecoratorMetadata: false,
        experimentalDecorators: false
    })
});

fis.match('*.html:jsx', {
    parser: fis.plugin('typescript'),
    rExt: '.js',
    isMod: false
});

fis.match('::package', {
    postpackager: fis.plugin('loader', {
        useInlineMap: false,
        resourceType: 'mod'
    })
});

fis.hook('node_modules', {
    shimProcess: false,
    shimGlobal: false,
    shimBuffer: false
});
fis.hook('commonjs', {
    extList: ['.js', '.jsx', '.tsx', '.ts'],
    paths: {
        'monaco-editor': './loadMonacoEditor'
    }
});

fis.on('compile:optimizer', function (file) {
    if (file.isJsLike && file.isMod) {
        var contents = file.getContent();

        if (
            typeof contents === 'string' &&
            contents.substring(0, 7) === 'define('
        ) {
            contents = 'amis.' + contents;

            contents = contents.replace(
                'function(require, exports, module)',
                'function(require, exports, module, define)'
            );

            file.setContent(contents);
        }
    }
});

fis.match('monaco-editor/min/**.js', {
    isMod: false,
    ignoreDependencies: true
});

// 这些用了 esm
fis.match('{echarts/extension/**.js, zrender/**.js}', {
    parser: fis.plugin('typescript', {
        sourceMap: true,
        importHelpers: true,
        esModuleInterop: true,
        emitDecoratorMetadata: false,
        experimentalDecorators: false
    })
});

fis.media('dev')
    .match('/node_modules/**.js', {
        packTo: '/pkg/npm.js'
    })
    .match('{monaco-editor,amis-editor}/**.js', {
        packTo: null
    });

const ghPages = fis.media('gh-pages');

ghPages.match('/node_modules/(**)', {
    release: '/n/$1'
});

ghPages.match('mock/**.{json,js,conf}', {
    release: false
});

ghPages.match('::package', {
    packager: fis.plugin('deps-pack', packConfig),
    postpackager: [
        fis.plugin('loader', {
            useInlineMap: false,
            resourceType: 'mod'
        })
    ]
});

ghPages.match('*.{css,less,scss}', {
    optimizer: fis.plugin('clean-css'),
    useHash: true
});

ghPages.match(
    '{echarts/extension/**.js,zrender/**.js,ansi-to-react/lib/index.js,highlight.js/**.js}',
    {
        parser: [
            fis.plugin('typescript', {
                sourceMap: true,
                importHelpers: true,
                esModuleInterop: true,
                emitDecoratorMetadata: false,
                experimentalDecorators: false
            })
        ]
    }
);

ghPages.match('::image', {
    useHash: true
});

ghPages.match('*.{js,ts,tsx}', {
    optimizer: fis.plugin('terser'),
    useHash: true
});

ghPages.match('*.map', {
    release: false,
    url: 'null',
    useHash: false
});
ghPages.match('{*.jsx,*.tsx,*.ts}', {
    parser: [
        fis.plugin('typescript', {
            sourceMap: false,
            importHelpers: true,
            esModuleInterop: true
        }),

        function (contents, file) {
            if (typeof contents !== 'string') {
                return contents;
            }

            // dynamic import 支持
            contents = contents.replace(
                /return\s+(tslib_\d+)\.__importStar\(require\(('|")(.*?)\2\)\);/g,
                function (_, tslib, quto, value) {
                    return `return new Promise(function(resolve){require(['${value}'], function(ret) {resolve(${tslib}.__importStar(ret));})});`;
                }
            );

            return contents;
        }
    ]
});
ghPages.match('{*.jsx,*.tsx,*.ts,*.js}', {
    moduleId: function (m, path) {
        return fis.util.md5('amis' + path);
    }
});
ghPages.match('*', {
    domain: '/amis-editor-demo',
    deploy: [
        fis.plugin('skip-packed'),
        fis.plugin('local-deliver', {
            to: './gh-pages'
        })
    ]
});
ghPages.match('{*.min.js,monaco-editor/**.js}', {
    optimizer: null
});
ghPages.match('monaco-editor/**', {
    useHash: false
});
ghPages.match('amis/schema.json', {
    release: '/schema.json'
});
