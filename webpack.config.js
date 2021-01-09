const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const filename = (ext) => isDev ? `[name].${ext}` : `[name].[hash].${ext}`

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: 'all'
    }
  }

  if (isProd) {
    config.minimizer = [
      new OptimizeCssAssetWebpackPlugin(),
      new TerserWebpackPlugin()
    ]
  }

  return config
};

const cssLoaders = (...additive) => [
  {
    loader: MiniCssExtractPlugin.loader,
  },
  'css-loader',
  ...additive,
];

const scriptLoaders = () => [
  {
    loader: 'ts-loader',
    options: {
      configFile: path.resolve(__dirname, 'tsconfig.json'),
    },
  },
];

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: isDev ? 'development' : 'production',
  entry: './main.ts',
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@core': path.resolve(__dirname, 'src', 'core'),
      '@components': path.resolve(__dirname, 'src', 'components'),
    }
  },
  optimization: optimization(),
  devtool: isDev ? 'source-map' : 'nosources-source-map',
  devServer: {
    port: 4000,
    hot: true,
    historyApiFallback: true,
    proxy: [
      {
        context: ['/proxy-api/**'],
        target: 'https://proxy-api/api/',
        pathRewrite: { '^/api/': '/' },
        secure: false,
        onProxyReq: proxyReq => {
          proxyReq.setHeader('Host', 'my-custom-host');
        },
      },
    ],
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './index.html',
      minify: {
        collapseWhitespace: isProd
      }
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: filename('css')
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: cssLoaders()
      },
      {
        test: /\.(sass|scss)$/,
        use: cssLoaders('sass-loader')
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        use: ['file-loader']
      },
      {
        test: /\.tsx?$/,
        use: scriptLoaders(),
        exclude: /(node_modules)/
      }
    ]
  }
};