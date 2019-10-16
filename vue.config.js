const path = require('path');
const CompressionPlugin = require('compression-webpack-plugin');
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
                target: 'http://192.168.8.14:9012',
                // target: 'http://192.168.9.9:9012',
                // target: 'http://10.30.30.241:8600/',
                changeOrigin: true
            }
        }
    },
    chainWebpack: config => {
        // 开启图片压缩;
        config.module
            .rule('images')
            .test(/\.(png|jpe?g|gif)(\?.*)?$/)
            .use('image-webpack-loader')
            .loader('image-webpack-loader')
            .options({ bypassOnDebug: true });
        config.module
            .rule('svg-sprite')
            .use('svgo-loader')
            .loader('svgo-loader');
        config.resolve.alias.set('@', resolve('src'));

        config.when(process.env.NODE_ENV === 'production', config => {
            config.optimization.splitChunks({ chunks: 'all' });
            // gzip
            config.plugin('compressionPlugin').use(CompressionPlugin, [
                {
                    test: /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i, // 匹配文件名
                    threshold: 10240, // 对超过10k的数据压缩
                    deleteOriginalAssets: false // 不删除源文件
                }
            ]);
        });
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
                   @import "@/scss/_variables.scss";
                   @import "@/scss/common.scss";
              `
            }
        }
    }
};
