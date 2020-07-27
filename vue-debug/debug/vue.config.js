const path = require('path')
console.log(path.resolve(__dirname + '/node_modules/vue/dist/vue.esm.js'))
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'vue': path.resolve(__dirname + '/node_modules/vue/dist/vue.esm.js')
      }
    }
  }
}