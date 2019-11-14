const path = require('path');
const webpack = require('webpack');
const config = require('./src/config'); // hack node环境不支持 export; export default 
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const resolve = dir => {
    return path.join(__dirname, dir);
};
console.log(config);
// 默认情况下，应用将被部署在域的根目录下,
// 例如：https://www.yingzhong.com/
// 默认：'/'
// 如果应用程序部署在子路径中，则需要在这指定子路径
// 例如：https://www.yingzhong.com/my-app/
// 需要将它改为'/my-app/'
const env = process.env.NODE_ENV;
const BASE_URL = env === 'development' ? '/' : config.PROJECT_NAME;
const target = process.env.VUE_APP_API_BASE_URL ? process.env.VUE_APP_API_BASE_URL : process.env.VUE_APP_API_BASE; //代理的base地址
const proxyStr = `${process.env.VUE_APP_API_BASE}`;
const proxyRewrite = `^${process.env.VUE_APP_API_BASE}`;
let minimizer = [];
    
module.exports = {
    baseUrl: BASE_URL,
    outputDir: process.env.outputDir,
    // lintOnSave：{ type:Boolean default:true } 是否使用eslint
    lintOnSave: true,
    css: {
        extract: true, // 是否使用css分离插件 ExtractTextPlugin，采用独立样式文件载入，不采用<style>方式内联至html文件中
        sourceMap: env === 'development', // 是否在构建样式地图，false将提高构建速度
    },
    chainWebpack: config => {
        config.resolve.alias.set('@', resolve('src')).set('_c', resolve('src/components'));
        config.plugin('provide').use(webpack.ProvidePlugin, [{
            'window.Quill': 'quill/dist/quill.js',
            'Quill': 'quill/dist/quill.js'
        }]);
        return config;
    },
    configureWebpack:{
        optimization: {
            minimizer: minimizer
        },
        devtool: 'source-map'
    },
    // 打包时不生成.map文件
    productionSourceMap: env === 'development',
    parallel: require('os').cpus().length > 1, // 构建时开启多进程处理babel编译
    devServer: { //调用接口的基础路径，来解决跨域
        port: 8088,
        open: true,
        proxy: {
            [proxyStr]: {
                // 目标 API 地址
                target: target,
                // 将主机标头的原点更改为目标URL
                changeOrigin: true,
                pathRewrite: {
                    [proxyRewrite]: ''
                }
            }
        },
    }
}
