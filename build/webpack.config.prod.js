import webpack from 'webpack';
import chalk from 'chalk'
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import ProgressBarPlugin from 'progress-bar-webpack-plugin'
import WebpackNotifierPlugin from 'webpack-build-notifier'
import autoprefixer from 'autoprefixer'
import postcssPxtorem from 'postcss-pxtorem'
import ManifestPlugin from './plugins/manifest'
import ip from 'ip'
import CleanWebpackPlugin from 'clean-webpack-plugin'
import ZipWebpackPlugin from 'zip-webpack-plugin'

import { entry, alias, provide ,loader } from './config';


export default {
    watch: false,
    debug: false,
    entry: entry,
    devtool:false,
    output: {
        path: `${process.cwd()}/dist`,
        filename: '[name].js',
        chunkFilename: '[name]_' + '[chunkhash:7]' + '.js',
        publicPath:'',
        // publicPath: `http://${ip.address()}/qqd-weixin/`
        // publicPath: 'http://house-test-water.oss.aliyuncs.com/resource/qqd-weixin_test/'
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
              'app.js'],
            hashNum:7
        }),
        new webpack.ProvidePlugin(provide),
        //进度条插件
        new ProgressBarPlugin({
            summary: false,
            format: chalk.green.bold('[:bar] :percent ') + chalk.yellow('(:elapsed seconds) :msg'),
            customSummary (buildTime) {
                process.stdout.write(chalk.green.bold(" ---------buildTime:" + buildTime + "---------"));
            }
        }),
       
        // https://github.com/RoccoC/webpack-build-notifier
        new WebpackNotifierPlugin({
            title: 'vue-ui',
            successSound: 'Submarine',
            failureSound: 'Glass',
            suppressSuccess: true
        }),
        
        //定义环境变量
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            },
            __DEV__: false,
            __PROD__: true
        }),
        new ExtractTextPlugin("[name].css"),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename:'common.js',
            minChunks: Infinity
        }),
        
        // https://github.com/johnagan/clean-webpack-plugin
        new CleanWebpackPlugin(['dist', 'zip'], {
            root: process.cwd(),
            verbose:false
        }),

        // https://github.com/erikdesjardins/zip-webpack-plugin
        new ZipWebpackPlugin({
            path: '../zip', //relative (to Webpack output path)
            filename: 'qqd-weixin.zip'
        }),

        //允许错误不打断程序
        new webpack.NoErrorsPlugin(),
        
        new webpack.optimize.OccurenceOrderPlugin(),

        new webpack.optimize.DedupePlugin(),

        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })

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
             css:  ExtractTextPlugin.extract('style-loader','css-loader!postcss-loader'),
             sass: ExtractTextPlugin.extract('style-loader','css-loader!postcss-loader!sass-loader')
        }
    }
}
