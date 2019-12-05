module.exports = (api, options, rootOptions) => {
    api.extendPackage({
        scripts: {
            "serve": "vue-cli-service serve",
            "build:prod": "cross-env NODE_ENV=production vue-cli-service build --mode=production",
            "build:dev": "cross-env NODE_ENV=production vue-cli-service build --mode=development",
            "build:test": "cross-env NODE_ENV=production vue-cli-service build --mode=test",
            "build:analyz": "cross-env NODE_ENV=production vue-cli-service build --mode=analyz",
            "lint": "vue-cli-service lint"
        },
    })

    api.extendPackage({
        dependencies: {
            "axios": "^0.19.0",
            "core-js": "^2.6.9",
            "element-ui": "^2.4.8",
            "moment": "^2.24.0",
            "normalize.css": "^8.0.1",
            "nprogress": "0.2.0",
            "vue": "^2.6.10",
            "vue-router": "^3.1.2",
            "vuex": "^3.1.1"
        },
        devDependencies: {
            "@vue/cli-plugin-babel": "^3.0.4",
            "@vue/cli-plugin-eslint": "^3.11.0",
            "@vue/cli-service": "^3.0.4",
            "@vue/eslint-config-prettier": "^5.0.0",
            "babel-eslint": "^10.0.2",
            "babel-plugin-component": "^1.1.1",
            "babel-plugin-transform-remove-console": "^6.9.4",
            "compression-webpack-plugin": "^3.0.0",
            "cross-env": "^6.0.3",
            "eslint": "^6.1.0",
            "eslint-plugin-prettier": "^3.1.0",
            "eslint-plugin-vue": "^5.2.3",
            "image-webpack-loader": "^6.0.0",
            "lint-staged": "^9.2.5",
            "node-sass": "^4.11.0",
            "prettier": "^1.18.2",
            "query-string": "^6.8.3",
            "sass-loader": "^7.1.0",
            "svgo": "^1.3.0",
            "svgo-loader": "^2.2.1",
            "vue-cli-plugin-svg-sprite": "^1.0.0",
            "vue-template-compiler": "^2.5.17",
            "webpack-bundle-analyzer": "^3.5.2"
        },
    })
    api.extendPackage({
        "gitHooks": {
            "pre-commit": "lint-staged"
        },
        "lint-staged": {
            "*.{js,vue}": [
                "vue-cli-service lint",
                "prettier --write",
                "git add"
            ]
        }
    })

    // 删除 vue-cli3 默认目录
    api.render(files => {
        Object.keys(files)
            .filter(path => path.startsWith('src/') || path.startsWith('public/'))
            .forEach(path => delete files[path]);
    });
    // api.render('./template');
}
