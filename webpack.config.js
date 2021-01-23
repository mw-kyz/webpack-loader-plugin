// const { resolve } = require('path')
// const HtmlWebpackPlugin = require('html-webpack-plugin')
// 自定义loader的配置
// module.exports = {
//   mode: 'development',
//   entry: resolve(__dirname, 'src/app.js'),
//   output: {
//     path: resolve(__dirname, 'build'),
//     filename: 'app.js'
//   },
//   devtool: 'source-map',
//   resolveLoader: {
//     modules: [resolve(__dirname, 'node_modules'), resolve(__dirname, 'loaders')]
//   },
//   module: {
//     rules: [
//       {
//         test: /\.tpl$/,
//         use: [
//           'babel-loader',
//           {
//             loader: 'tpl-loader',
//             options: {
//               log: true
//             }
//           }
//         ]
//       }
//     ]
//   },
//   plugins: [
//     new HtmlWebpackPlugin({
//       template: resolve(__dirname, 'index.html')
//     })
//   ],
//   devServer: {
//     port: 3333
//   }
// }

const { resolve } = require('path')
const MdToHtmlPlugin = require('./plugins/md-to-html-plugin')

// 自定义plugin的配置
module.exports = {
  mode: 'development',
  entry: resolve(__dirname, 'src/app1.js'),
  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'app1.js'
  },
  plugins: [
    new MdToHtmlPlugin({
      template: resolve(__dirname, 'test.md'),
      filename: 'test.html'
    })
  ],
  devServer: {
    port: 3335
  }
}