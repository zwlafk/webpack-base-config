const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// extract-text-webpack-plugin分离css文件 不支持hmr
// const ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
    mode: 'development',
    entry: [
        './src/index.js'
    ],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        contentBase: './src',
        hot: true
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
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new webpack.HotModuleReplacementPlugin()
        // new ExtractTextPlugin('style.css')
    ]
};