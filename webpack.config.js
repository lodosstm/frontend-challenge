const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV || 'dev';

module.exports = {

  entry: {
    app: './src/app.js'
  },

  resolve: {
    extensions: ['.js', '.jsx']
  },

  output: {
    path: path.resolve(__dirname, './build'),
    filename: '[name].js'
  },

  module: {
    loaders: [{
      test: /\.js$/,
      include: [
        path.resolve(__dirname, './src')
      ],
      loader: 'babel-loader',
      query: {
        presets: ['es2015', 'stage-0']
      }
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: 'css-loader'
      })
    },{
      test: /\.(png|jpg|ico|svg)$/,
      loader: 'file?name=[path][name].[ext]'
    }]
  },

  plugins: [
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(NODE_ENV)
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new ExtractTextPlugin('style.css')
  ],

  watch: NODE_ENV === 'dev',
  watchOptions: {
    poll: true,
    aggregateTimeout: 100
  },

  devtool: NODE_ENV === 'development' ? 'cheap-inline-module-source-map' : 'source-map',
  devServer: {
    host: 'localhost',
    port: 8080
  }

};

if (NODE_ENV === 'prod') {
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: true,
        unsafe: true
      }
    })
  );
}
