const TerserPlugin = require('terser-webpack-plugin');//build 去掉 log
const path = require('path')


require('babel-polyfill')


const resolve = dir => {
  return path.join(__dirname, dir)
}



module.exports = {
  // Project deployment base
  // By default we assume your app will be deployed at the root of a domain,
  // e.g. https://www.my-app.com/
  // If your app is deployed at a sub-path, you will need to specify that
  // sub-path here. For example, if your app is deployed at
  // https://www.foobar.com/my-app/
  // then change this to '/my-app/'
  baseUrl: './',
  // tweak internal webpack configuration.
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  // 如果你不需要使用eslint，把lintOnSave设为false即可
  lintOnSave: false,
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
      .set('_c', resolve('src/components'))
      .set('@$@', resolve('src/_$_project'))
  },
  // 设为false打包时不生成.map文件
  productionSourceMap: false,
  // 这里写你调用接口的基础路径，来解决跨域，如果设置了代理，那你本地开发环境的axios的baseUrl要写为 '' ，即空字符串
  devServer: {
    proxy: {
      '/api': {
        target: 'http://192.168.137.1:8002',
        // pathRewrite: { '^/api': '/' },//字符串替换 根据实际情况调用
        changeOrigin: true//是否跨域 
      }
    },
  },


  
  // 关键配置：node_modules里面需要用babel-loader进行编译的包（node_modules的包如果没做 es6 => es5 转码则需要自己用babel-polyfill进行手动处理）
  // 如果IE下还跑不起来，控制台发现有其他es6语法的，尝试调试去找到底是哪个包
  transpileDependencies: [
    'view-design',
    'iview',
    'axios'
  ],

  //build时去掉log
  configureWebpack: {
    optimization: {
      minimizer: [
        // 打包的时候，把控制台console信息去掉
        // new TerserPlugin({
        //   terserOptions: {
        //     ecma: undefined,
        //     warnings: false,
        //     parse: {},
        //     compress: {
        //       drop_console: true,
        //       drop_debugger: false,
        //       pure_funcs: ['console.log'] // 移除console
        //     }
        //   },
        // }),
      ]
    }
  }
}
