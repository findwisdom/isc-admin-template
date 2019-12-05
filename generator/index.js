module.exports = (api, options, rootOptions) => {
    // api.extendPackage({
    //     dependencies: {
    //         "axios": "^0.19.0",
    //         "core-js": "^2.6.9",
    //         "element-ui": "^2.4.8",
    //         "moment": "^2.24.0",
    //         "normalize.css": "^8.0.1",
    //         "nprogress": "0.2.0",
    //         "vue": "^2.6.10",
    //         "vue-router": "^3.1.2",
    //         "vuex": "^3.1.1",
    //     }
    // })
    // 删除 vue-cli3 默认目录
    api.render(files => {
        Object.keys(files)
            .filter(path => path.startsWith('src/') || path.startsWith('public/'))
            .forEach(path => delete files[path]);
    });
    api.render('./template');
}
