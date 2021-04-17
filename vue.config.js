module.exports = {
  lintOnSave: false,
  devServer: {
    proxy: 'http://119.29.20.213:8080'
  },
  chainWebpack: (config) => {
    config
      .plugin('html')
      .tap((args) => {
        args[0].title = '通用航空综合管理系统'
        return args
      })
  }
}
