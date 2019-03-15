const path = require('path');
const merge = require('webpack-merge');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

const URL = 'dev';

const baseConfig = {
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': resolve('src'),
    },
  },
};

module.exports = {
  configureWebpack: (config) => {
    merge(config, baseConfig);
    if (process.env.NODE_ENV === 'production') {
      // mutate config for production...
    } else {
      // mutate for development...
    }
  },
  devServer: {
    proxy: {
      '/portal-web-system': {
        target: `http://bdp.${URL}.sf-express.com/portal-web-system`,
        pathRewrite: {
          '^/portal-web-system': '',
        },
      },
    },
    host: 'vue.sf-express.com', // can be overwritten by process.env.HOST
    // host: '10.118.45.52',
    port: 8082, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
  },
  productionSourceMap: false,
  plugins: [
    new MonacoWebpackPlugin({
      // available options are documented at https://github.com/Microsoft/monaco-editor-webpack-plugin#options
      languages: ['javascript']
    })
  ]
};
