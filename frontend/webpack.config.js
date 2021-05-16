const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[contenthash].bundle.js',
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 9000,
    watchContentBase: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new CleanWebpackPlugin(),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [autoprefixer()],
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['style-loader',
          {
            loader: 'css-loader',
            options: {
              url: true,
              import: true,
            },
          },
          'postcss-loader',
          'sass-loader'],
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
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            publicPath: path.resolve(__dirname, '/assets/img'),
            outputPath: 'assets/img',
          },
        },
      },
      {
        test: /\.(html)$/,
        use: ['html-loader'],
      },
    ],
  },
};
