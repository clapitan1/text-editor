const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js',
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin(),
      new WebpackPwaManifest({
        name: 'JATE',
        short_name: 'JATE',
        description: 'My awesome Progressive Web App!',
        background_color: '#ffffff',
        crossorigin: null, //can be null, use-credentials, or anonymous
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512], // multiple sizes
          },
          // {
          //   src: path.resolve('src/assets/large-icon.png'),
          //   size: '1024x1024' // you can also use the specifications pattern
          // },
          // {
          //   src: path.resolve('src/assets/maskable-icon.png'),
          //   size: '1024x1024',
          //   purpose: 'maskable'
          // }
        ],
      }),
      new InjectManifest({
        swSrc: './src/database.js',
        swDest: 'database.js',
      }),
    ],

    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
      ],
    },
  };
};
