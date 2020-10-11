const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = ({ mode = 'development' }) => {
  const isDev = mode === 'development';
  return {
    entry: ['react-hot-loader/patch', path.resolve(__dirname, './src/index.js')],
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
    },
    resolve: {
      extensions: ['.jsx', '.js', '.scss'],
    },
    devServer: {
      hot: true,
      hotOnly: true,
      compress: true,
      port: 9000,
      contentBase: path.resolve(__dirname, './src'),
    },
    module: {
      rules: [
        {
          test: /\.s[ac]ss$/i,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                hmr: isDev,
                reloadAll: true,
              },
            },
            'css-loader',
            'sass-loader',
          ],
        },
        {
          test: /\.js[x]?$/,
          exclude: /node_modules/,
          use: [
            'babel-loader',
          ],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            }
          }
        }
      ]
  },
    plugins: [
      new HtmlWebpackPlugin({
        template: 'src/index.html',
        minify: false,
      }),
      new MiniCssExtractPlugin({
        filename: isDev ? '[name].css' : '[name].[hash].css',
        chunkFilename: isDev ? '[id].css' : '[id].[hash].css',
      }),
    ]
  }}
