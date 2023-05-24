const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); 

module.exports = {
  entry: './src/pages/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
  },
  mode:'development',
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    open: true,
    port:8080,
    compress:true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use:'babel-loader',
        exclude: /node_modules/,
      },
      
      {
        test: /\.(svg|.jpg|png|jpg)$/,
        type:'asset/resource',
        generator: {
          filename:'image/[name].[hash][ext]',
        },
      },
      {
        test: /\.(woff2|woff)$/,
        type:'asset/resource',
        generator: {
          filename:'fonts/[name].[hash][ext]',
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, {
          loader: 'css-loader',
          options: { importLoaders: 1 },
        },
      'postcss-loader']
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
  ],
};
