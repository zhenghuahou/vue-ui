import webpack from 'webpack';
import ProgressBarPlugin from 'progress-bar-webpack-plugin';
import WebpackNotifierPlugin from 'webpack-build-notifier';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import chalk from 'chalk'
import ip from 'ip'
import autoprefixer from 'autoprefixer'
import postcssPxtorem from 'postcss-pxtorem'
import ManifestPlugin from './plugins/manifest'
import {timestamp} from './util'

import { entry, alias, provide ,loader } from './config';

export default {
    watch: true,
    debug: true,
    entry: entry,
    devtool: 'cheap-module-eval-source-map',
    output: {
        path: `${process.cwd()}/dist`,
        filename: '[name].js',
        chunkFilename: '[name]_' + '[hash:7]' + '.js',
        publicPath: ''
        // publicPath: `http://${ip.address()}/qqd-h5/`
    },
    resolve: {
        extensions: ['', '.js', '.vue'],
        alias: alias
    },
    plugins:[
         //上线时需要后端加上版本号的文件
        new ManifestPlugin({
            versionFiles:[
              'common.css',
              'common.js',
              'app.js',
              'app.css'],
            hashNum:7
        }),
        new webpack.ProvidePlugin(provide),
        //进度条插件
        new ProgressBarPlugin({
            summary: false,
            format: chalk.green.bold('[:bar] :percent ') + chalk.yellow('(:elapsed seconds) :msg'),
            customSummary (buildTime) {
                //console每次编程成功都会新生成一行
                //console.log(chalk.cyan(timestamp()) + chalk.green.bold(" ---------buildTime:" + buildTime + "---------"));
                process.stdout.write(chalk.cyan(timestamp()) + chalk.green.bold(" ---------buildTime:" + buildTime + "---------"));
            }
        }),
       
        // https://github.com/RoccoC/webpack-build-notifier
        new WebpackNotifierPlugin({
            title: `H5贷总管`,
            logo: 'global/img/logo.png',
            successSound: 'Submarine',
            failureSound: 'Glass',
            suppressSuccess: true
        }),
        
        //定义环境变量
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"development"'
            },
            __DEV__: true,
            __PROD__: false
        }),

        // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
        new webpack.HotModuleReplacementPlugin(),

        new ExtractTextPlugin("[name].css"),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename:'common.js',
            minChunks: Infinity
        }),
        
        //允许错误不打断程序
        new webpack.NoErrorsPlugin()

    ],
    module: {
        loaders: [{
            test: /\.js[x]?$/,
            exclude: /node_modules/,
            loader: 'babel-loader?' + JSON.stringify({
                    compact: false
            })
        },{
            test: /\.vue$/,
            loader: 'vue'
        },{
            test: /\.css$/,
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader')

        },{
            test: /\.scss$/,
            // loaders:['style', 'css','sass']
            loader:ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader!sass-loader')
        },{
            test: /\.(png|jpg|gif|woff|woff2|ttf|eot|svg|swf)$/,
            loader: "file-loader?name=[name]_[sha512:hash:base64:7].[ext]"
        }]
    },
    postcss: [
        autoprefixer({
            browsers: ['last 2 versions', 'iOS >= 7', 'Android >= 4']
        }),
        postcssPxtorem({
            rootValue: 100,
            unitPrecision: 5,
            propWhiteList: [],
            selectorBlackList: [/^html$/], 
            replace: true,
            mediaQuery: false,
            minPixelValue: 0
        })
    ],

    vue: {
        loaders:{
            css: 'vue-style-loader!css-loader?sourceMap!postcss-loader',
            sass: 'vue-style-loader!css-loader?sourceMap!postcss-loader!sass-loader'
        }
    }
}



