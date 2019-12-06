const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

function resolve(dir) {
    return path.join(__dirname, dir);
}

module.exports = {
    devServer: {
        proxy: {
            '/common/api': {
                target: 'http://10.30.30.241:8600',
                changeOrigin: true
            },
            '/api': {
                target: 'http://10.20.2.57:8080',
                changeOrigin: true
            }
        }
    },
    chainWebpack: config => {
        // 开启图片压缩;
        config.module
            .rule('svg-sprite')
            .use('svgo-loader')
            .loader('svgo-loader');
        config.resolve.alias.set('@', resolve('src'));
        // 打包分析
        config.when(process.env.IS_ANALYZ, config => {
            config.plugin('webpack-report').use(BundleAnalyzerPlugin, [
                {
                    analyzerMode: 'static'
                }
            ]);
        });
    },
    pluginOptions: {
        svgSprite: {
            /*
             * The directory containing your SVG files.
             */
            dir: 'src/assets/svg',
            /*
             * The reqex that will be used for the Webpack rule.
             */
            test: /\.(svg)(\?.*)?$/,
            /*
             * @see https://github.com/kisenka/svg-sprite-loader#configuration
             */
            loaderOptions: {
                extract: true,
                spriteFilename: 'img/icons.[hash:8].svg' // or 'img/icons.svg' if filenameHashing == false
            },
            /*
             * @see https://github.com/kisenka/svg-sprite-loader#configuration
             */
            pluginOptions: {
                plainSprite: true
            }
        }
    },
    css: {
        loaderOptions: {
            // pass options to sass-loader
            sass: {
                // @/ is an alias to src/
                // so this assumes you have a file named `src/variables.scss`
                data: `
                   @import "@/scss/variables.scss";
              `
            }
        }
    }
};
