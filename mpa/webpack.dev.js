const merge = require('webpack-merge').merge
const common = require('./webpack.common.js');
// console.log(common)

console.log(merge(common, {
  devtool: 'inline-source-map',
  devServer: {
  // dev 配置
  }
}))
module.exports = merge(common, {
   devtool: 'inline-source-map',
   devServer: {
   // dev 配置
 }
});