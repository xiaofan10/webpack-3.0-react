const path = require('path');
/**
 * name extract-text-webpack-plugin
 * 目前知识分离出css所有代码
 * version @2.1.2
 */
const ExtracTextPlugin = require('extract-text-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');// html模板会动态导入打包的css和js，所以index.html页面不用写导入css和js的语句
// const UglifyJsPlugin = require('webpack/lib/optimize/UginfyJsPlugin'); // js压缩 打包上线时用
const NamedModulesPlugin = require('webpack/lib/NamedModulesPlugin'); 
const HotModuleReplacementPlugin = require('webpack/lib/HotModuleReplacementPlugin'); // 通过该模块实现热加载

const config = {
  entry: [
    './src/index.js',
  ],
  // 如果这里是数组或者字符串，那么chunk合成的文件名为main
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        loaders: ExtracTextPlugin.extract(
          {
            fallback: 'style-loader',
            use:['css-loader','less-loader'],
            // exclude: path.resolve(__dirname, 'node_modules') // 派出node_modules 下面的文件 这个会报错
          }
        ),
      },
      {
        test: /\.(jsx|js)$/,
        use:[{
          loader:'babel-loader',
          options: {
            cacheDirectory: true,
          }
        }],
        include: path.resolve(__dirname, 'src') // 只命中src下面的js文件，减小搜索时间
      },
      {
        test: /\.(gif|png|jpe?g|eto|woff|ttf|svg|pdf)$/,
        use: ['file-loader']
      }
    ]
  },
  resolve: { // 用来配置webpack 如何来寻找模块文件
    alias: { // 用来给路径设置别名
      components: './src/components',
    },
    extensions: ['.js','.jsx'], // 会从左到右依次加载
    modules: ['./src/components', 'node_modules'], // 这样导入components下的button 就可以import 'button'
  },
  plugins: [
    new cleanWebpackPlugin(['dist']),
    new ExtracTextPlugin({
      filename: '[name]_[contenthash:8].css'
    }),
    new HtmlWebpackPlugin({ 
      template: './src/index.html',
      filename: 'index.html'
    }),
    new NamedModulesPlugin(), //以便更容易查看要修补(patch)的依赖 不懂中
    new HotModuleReplacementPlugin(), // 为了支持热替换生成.hot-update.json文件
  ],
  devServer: {
    contentBase: path.resolve(__dirname, "./"),
    compress: true,
    port: 9000,
    hot: true,
    proxy: {} // 代理到后端服务接口
  }
};

module.exports = config;