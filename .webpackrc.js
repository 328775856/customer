export default {
  proxy: {
    '/': {
      //  target: 'http://192.168.10.212:8765/api/GbManager_wlj/GbManager',
      // target: 'http://192.168.10.173:8765/api/GbManager_shenwei/GbManager',
      target: 'http://192.168.10.173:8765/api/GbManager/GbManager',
      target: 'http://192.168.10.173:8768/api',
      // target: 'http://192.168.10.173:8765/api/GbManager_wlj/GbManager',
      changeOrigin: true,
      pathRewrite: { '^/': '' },
    },
  },
  extraBabelPlugins: [['import', { libraryName: 'antd', style: true }]],
  env: {
    // development: {
    //   extraBabelPlugins: ['dva-hmr']
    // }
  }
}
