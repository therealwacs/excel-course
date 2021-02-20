const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const ESlintPlugin = require('eslint-webpack-plugin')

module.exports = (env, argv) => {
  const isDev = (argv.mode === 'development')
  const isProd = !isDev
  console.log('isProd', isProd)
  console.log('isDev', isDev)
  const fileName = (ext) =>
    isProd ? `[name].[contenthash].bundle.${ext}` : `[name].bundle.${ext}`

  const plugins = () => {
    const base = [
      new HtmlWebPackPlugin({
        template: './index.html'
      }),
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, 'src', 'favicon.ico'),
            to: path.resolve(__dirname, 'dist')
          }
        ]
      }),
      new MiniCssExtractPlugin({
        filename: fileName('css')
      }),
      new CleanWebpackPlugin(),
    ]
    if (isDev) {
      base.push(new ESlintPlugin())
    }
    return base
  }

  return {
    target: 'web', // for dev server hot replacement module
    context: path.resolve(__dirname, 'src'),
    entry: {
      main: ['@babel/polyfill', '/index.js']
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: fileName('js')
    },
    resolve: {
      extensions: ['.js'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@core': path.resolve(__dirname, 'src', 'core')
      }
    },
    devtool: isDev ? 'source-map' : false,
    devServer: {
      contentBase: path.resolve(__dirname, 'dist'),
      port: 9000,
      open: true,
      // hot: true, // without html files watching
      watchContentBase: true
    },
    plugins: plugins(),
    module: {
      rules: [
        {
          test: /\.s[ac]ss$/i,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader'
          ]
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        },
        {
          test: /\.js$/,
          exclude: /node_mobules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        },
      ]
    },
  }
}
