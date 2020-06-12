const path = require('path')
const resolve = dir => path.join(__dirname, dir)

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
  // 将构建好的文件输出到哪里
  outputDir: 'dist'
}