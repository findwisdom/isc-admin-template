const path = require('path');
const CompressionPlugin = require('compression-webpack-plugin');

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
        config.resolve.alias
            .set('@', resolve('src'))
            .set('@components', resolve('src/components'))
            .set('@views', resolve('src/views'))
            .set('@enums', resolve('src/enums'))
            .set('@utils', resolve('src/utils'))
            .set('@services', resolve('src/services'))
            .set('@store', resolve('src/store'))
            .set('@router', resolve('src/router'))
            .set('@validations', resolve('src/validations'));
        config.optimization.minimize(true);
        config.optimization.splitChunks({ chunks: 'all' });
        // 开启js、css压缩
        if (process.env.NODE_ENV === 'production') {
            config.plugin('compressionPlugin').use(
                new CompressionPlugin({
                    test: /\.js$|\.html$|.\css/, // 匹配文件名
                    threshold: 10240, // 对超过10k的数据压缩
                    deleteOriginalAssets: false // 不删除源文件
                })
            );
        }
    },
    configureWebpack: {
        resolve: {
            alias: {
                components: path.join(__dirname, 'components')
            }
        }
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
