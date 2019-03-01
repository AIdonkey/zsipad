const CompressionWebpackPlugin = require('compression-webpack-plugin');

// const productionGzipExtensions = ['js', 'css'];
module.exports = {
  pluginOptions: {
    moment: {
      locales: ['zh-cn'],
    },
  },
  devServer: {
    host: '0.0.0.0',
    port: '9527',
    disableHostCheck: true,
    proxy: {
      '/api': {
        target: 'http://120.35.26.129:1732',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': '',
        },
        '/apx': {
          target: 'http://127.0.0.1:3000',
          changeOrigin: true,
          pathRewrite: {
            '^/apx': '',
          },
        },
      },
    },
  },
  chainWebpack: (config) => {
    const oneOfsMap = config.module.rule('scss').oneOfs.store;
    oneOfsMap.forEach((item) => {
      item
        .use('sass-resources-loader')
        .loader('sass-resources-loader')
        .options({
          // Provide path to the file with resources
          resources: './src/styles/home.scss',
        })
        .end();
    });
  },
  // configureWebpack: {
  //   plugins: [
  //     new CompressionWebpackPlugin({
  //       test: /\.js$|\.html$|.\css/, // 匹配文件名
  //       threshold: 10240, // 对超过10k的数据压缩
  //       deleteOriginalAssets: false, // 不删除源文件
  //     }),
  //   ],
  // },
};
