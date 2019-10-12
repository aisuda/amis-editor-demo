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
        '!echarts/**'
    ],
    'pkg/rich-text.js': ['amis/lib/components/RichText.js', 'froala-editor/**', 'jquery/**'],
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
        '!echarts/**'
    ],
    // css 打包
    'pkg/style.css': ['node_modules/*/**.css', '*.scss', '!/scss/*.scss', '/scss/*.scss', '!monaco-editor/**']
};

fis.get('project.ignore').push('public/**', 'gh-pages/**');

// 配置只编译哪些文件。

fis.set('project.files', ['*.html', 'mock/**']);

fis.match('/mock/**.{json,js,conf}', {
    // isMod: false,
    useCompile: false
});

fis.match('*.scss', {
    parser: fis.plugin('node-sass', {
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

fis.match('*.{jsx,tsx,ts}', {
    parser: [
        fis.plugin('typescript', {
            importHelpers: true,
            experimentalDecorators: true,
            sourceMap: true,
            esModuleInterop: true
        }),

        function(contents, file) {
            if (typeof contents !== 'string') {
                return contents;
            }

            // dynamic import 支持
            contents = contents.replace(/return\s+(tslib_\d+)\.__importStar\(require\(('|")(.*?)\2\)\);/g, function(
                _,
                tslib,
                quto,
                value
            ) {
                return `return new Promise(function(resolve){require(['${value}'], function(ret) {resolve(${tslib}.__importStar(ret));})});`;
            });

            return contents;
        }
    ],
    preprocessor: fis.plugin('js-require-css'),
    isMod: true,
    rExt: '.js'
});

fis.match('*.html:jsx', {
    parser: fis.plugin('typescript'),
    rExt: '.js',
    isMod: false
});

fis.match('monaco-editor/**.js', {
    isMod: false,
    standard: null
});

fis.match('/node_modules/monaco-editor/min/(**)', {
    standard: false,
    isMod: false,
    packTo: null,
    optimizer: false,
    postprocessor: function(content, file) {
        if (!file.isJsLike || /worker/.test(file.basename)) {
            return content;
        }

        content = content.replace(/\bself\.require\b/g, 'require || self.require');

        return (
            '(function(define, require) {\n' +
            content +
            '\n})(this.monacaAmd && this.monacaAmd.define || this.define, this.monacaAmd && this.monacaAmd.require);'
        );
    }
});
fis.match('/node_modules/monaco-editor/min/**/loader.js', {
    postprocessor: function(content) {
        return '(function(self) {\n' + content + '\n}).call(this.monacaAmd || (this.monacaAmd = {}));';
    }
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
    extList: ['.js', '.jsx', '.tsx', '.ts']
});

fis.media('dev')
    .match('/node_modules/**.js', {
        packTo: '/pkg/npm.js'
    })
    .match('monaco-editor/**.js', {
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

ghPages.match('::image', {
    useHash: true
});

ghPages.match('*.{js,ts,tsx}', {
    optimizer: fis.plugin('uglify-js'),
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

        function(contents, file) {
            if (typeof contents !== 'string') {
                return contents;
            }

            // dynamic import 支持
            contents = contents.replace(/return\s+(tslib_\d+)\.__importStar\(require\(('|")(.*?)\2\)\);/g, function(
                _,
                tslib,
                quto,
                value
            ) {
                return `return new Promise(function(resolve){require(['${value}'], function(ret) {resolve(${tslib}.__importStar(ret));})});`;
            });

            return contents;
        }
    ]
});
ghPages.match('{*.jsx,*.tsx,*.ts,*.js}', {
    moduleId: function(m, path) {
        return fis.util.md5('amis' + path);
    }
});
ghPages.match('*', {
    domain: 'https://bce.bdstatic.com/fex/amis-editor-gh-pages',
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
ghPages.match('monaco-editor/**.js', {
    useHash: false
});
