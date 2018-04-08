const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// extract-text-webpack-plugin分离css文件 不支持hmr
// const ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
    mode: 'development',
    entry: {
        
        index: './src/index.js',
        join: './src/join.js'
    },
    output: {
        filename: 'js/[name].js',     //每个页面对应的主js的生成配置
        chunkFilename: 'js/[id].chunk.js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        contentBase: './src/join.html',
        hot: true,
        inline:true
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                
                use: ['style-loader','css-loader']
            },{
                test: /\.less$/,
                // use: ExtractTextPlugin.extract({
                //     fallback: 'style-loader',
                //     use: ['css-loader', 'less-loader']
                //   })
                
                use: ['style-loader','css-loader', 'less-loader']
            },
            {
                test: /\.(jpg|png)$/,
                // 处理.png和.jpg格式的图片文件
                use: ['url-loader?limit=1000&name=img/[name].[ext]'
                // limit参数指图片大小（10kb），当小于这个值时图片转为base64，当把值修改为60000时，1.jpg（50kb）会被解析成base64，打包后查看index.html代码可以看到
                // name参数指图片文件的命名格式，前面可以加 img/ 表示图片存储路径
                ]
              },
            {
                test: /\.html$/,
                use: ['html-loader']
            },
            {
                //文件加载器，处理文件静态资源
                test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader?name=./fonts/[name].[ext]'
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
          "$": "jquery",
          "jQuery": "jquery",
          "window.jQuery": "jquery"
      }),
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new HtmlWebpackPlugin({
            template: './src/join.html'
        }),
        new webpack.HotModuleReplacementPlugin()
        // new ExtractTextPlugin('style.css')
    ]
};