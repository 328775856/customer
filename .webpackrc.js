let USERDOMAIN = '_' + process.env.USERDOMAIN;
export default {
  proxy: {
    '/': {
      target: 'http://192.168.10.173:8769/api/gb_customer/GbCustomer',
      // target: `http://192.168.10.173:8765/api/gb_customer{USERDOMAIN.toLowerCase()}/GbManager`, //后端专用
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

