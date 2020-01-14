// const CompressionWebpackPlugin = require('compression-webpack-plugin');
// const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;

const port = 8686;

// mock接口数据
//            /mock
//            http://mockapi.gm.inc
let mockApi = 'http://10.20.7.129:8090/app/mock/1/'

// 测试环境接口数据  
//              /dp                                   /reviceLog
//              http://10.112.180.13:8980             http://10.115.106.41:88 
// let testApi = ['http://localhost:8980', 'http://localhost:88', 'http://user-behavior.gm.inc']
let testApi = ['http://10.20.6.34:8000/lbccrm'] //['http://10.2.247.99:8000']   开发环境：http://10.20.7.129:8000    测试环境：http://10.20.6.34:8000

let proxy = {}
let methods = ['GET', 'POST', 'PUT', 'DELETE']
methods.map(r => {
  let pathRewrite = {}
  pathRewrite['/api/' + r] = '' // r
  proxy['/api/' + r] = {
    target: mockApi,// mockApi,
    changeOrigin: true,
    secure: false,  // 如果是https接口，需要配置这个参数
    // ws: true, // 是否启用websockets
    pathRewrite: pathRewrite
  }
})

if (testApi) {
  proxy['/api/test/'] = {
    target: testApi[0],
    changeOrigin: true,
    secure: false,  // 如果是https接口，需要配置这个参数
    // ws: true, // 是否启用websockets
    pathRewrite: { '/api/test': '' }
  },
    proxy['/api'] = {
      target: testApi[0],
      changeOrigin: true,
      secure: false,  // 如果是https接口，需要配置这个参数
      // ws: true, // 是否启用websockets
      pathRewrite: { '/api': '' }
    }
  // proxy['/api/dp'] = {
  //   target: testApi[1],
  //   changeOrigin: true,
  //   ws: true,
  //   pathRewrite: {'/api/dp': 'dp'}
  // }
  // proxy['/api/help-sys'] = {
  //   target: testApi[2],
  //   changeOrigin: true,
  //   ws: true,
  //   pathRewrite: {'/api/help-sys': 'help-sys'}
  // }
}

module.exports = {
  lintOnSave:false,
  // output:{
  //   filename:'[name].js',
  //   chunkFilename:'[name].js',// 设置按需加载后的chunk名字
  //   publicPath:'testdd/'
  // },
  filenameHashing: false,

  // pages: {
  //   index: {
  //     entry: 'src/main.js',
  //     chunks: ['chunk-vendors', 'chunk-common', 'index']
  //   }
  // },

  // configureWebpack: config => {
  //   // if (IS_PROD) {
  //     const plugins = [];
  //     plugins.push(
  //       new CompressionWebpackPlugin({
  //         filename: '[path].gz[query]',
  //         algorithm: 'gzip',
  //         test: productionGzipExtensions,
  //         threshold: 10240,
  //         minRatio: 0.8
  //       })
  //     );
  //     config.plugins = [
  //       ...config.plugins,
  //       ...plugins
  //     ];
  //   // }
  // },

  publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
  outputDir: "dist",
  assetsDir: "assets",

  runtimeCompiler: true,        // vue模板代码编译
  productionSourceMap: false,   // 打包清除map多个文件
  // cssSourceMap: true,           //开启    是否开启 cssSourceMap默认为false
  devServer: {
    disableHostCheck: true,     // localhost 127.0.0.1
    port,
    open: true,                 // 打开浏览器窗口
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: proxy
  }
};