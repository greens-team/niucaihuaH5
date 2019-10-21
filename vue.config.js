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
let testApi = ['http://dev.crmh5.com:8088'] //['http://10.2.247.99:8088']


let proxy = {}
let methods = ['GET','POST','PUT','DELETE']
methods.map(r=>{
  let pathRewrite = {}
  pathRewrite['/api/'+r] = r
  proxy['/api/'+r] = {
    target: mockApi,
    changeOrigin: true,
    ws: true,
    pathRewrite: pathRewrite
  }
})

if (testApi){
  proxy['/api'] = {
    target: testApi[0],
    changeOrigin: true,
    ws: true,
    pathRewrite: {'/api': ''}
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
  // output:{
  //   filename:'[name].js',
  //   chunkFilename:'[name].js',// 设置按需加载后的chunk名字
  //   publicPath:'testdd/'
  // },
  
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