const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: {
    app: [
      './src/index.js',
    ],
  },

  output: {
    path: path.join(__dirname, 'assets'),
    publicPath: '/assets/',
    filename: '[name].js',
  },

  devServer: {
    static: {
      directory: __dirname
    }
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_mdules/,
        use: {
          loader: 'babel-loader',
          options: {
            "presets": ["@babel/preset-env", "@babel/preset-react"],
            "targets": "defaults"
          }
        },
        include: [path.join(__dirname, 'src'), path.join(__dirname, '../src')],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      },
      {
        test: /\.(woff2|woff|svg|ttf|eot)([\?]?.*)$/,
        use: 'file-loader?name=[name].[ext]',
      },
    ],

    // noParse: [],
  },

  plugins: [
    new MiniCssExtractPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
  ],
};
