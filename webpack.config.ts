import * as path from 'path';
import * as webpack from 'webpack';
import { Configuration as wdsConfiguration } from 'webpack-dev-server';
import * as TsCheckerPlugin from 'fork-ts-checker-webpack-plugin';
import * as HappyPack from 'happypack';

const threadPool = HappyPack.ThreadPool({ size: TsCheckerPlugin.ONE_CPU_FREE });

const devServer: wdsConfiguration = {
  port: 6005,
  https: true,
  // hot: true,
  disableHostCheck: true,
  headers: { 'Access-Control-Allow-Origin': '*' },
  contentBase: path.resolve(__dirname, './dist')
};

const config: webpack.Configuration = {
  devServer,
  entry: {
    'app': './src/app.tsx',
  },
  output: {
    libraryTarget: 'this',
    path: path.resolve(__dirname, './dist'),
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].js?[hash]',
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, './src/'),
      core: path.resolve(__dirname, './src/core'),
      ui: path.resolve(__dirname, './src/ui'),
      tslib: path.resolve(__dirname, './node_modules/tslib')
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
  module: {
    rules: [
      {
        test: /\.json$/,
        loader: 'happypack/loader?id=json'
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'happypack/loader?id=ts',
      },
      // {
      //   test: require.resolve('webpack-require-weak'),
      //   loader: 'happypack/loader?id=ts'
      // },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'happypack/loader?id=ts',
      },
      // {
      //   test: require.resolve('jquery'),
      //   use: [{
      //     loader: 'expose-loader',
      //     options: 'jQuery'
      //   },
      //   {
      //     loader: 'expose-loader',
      //     options: '$'
      //   }]
      // },
      // {
      //   test: require.resolve('qrcodejs/qrcode'),
      //   use: 'exports-loader?QRCode'
      // },
      // {
      //   test: /\.css$/,
      //   use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'happypack/loader?id=css' })
      // },
      {
        test: /\.(png|gif|jpg|jpeg)$/,
        loader: 'file-loader?name=img/[name].[ext]?[md5:hash:base62]'
      },
      {
        test: /fonts[\\/].*\.(woff|woff2|eot|ttf|svg)$/,
        loader: 'file-loader?name=fonts/[name].[ext]?[md5:hash:base62]'
      },
      {
        test: /\.mp3$/,
        loader: 'file-loader?name=sounds/[name].[ext]?[md5:hash:base62]'
      },
      // {
      //   test: /\.(scss)$/,
      //   use: [
      //     'style-loader', // Inject CSS to page.
      //     'css-loader', // Translates CSS into CommonJS modules.
      //     {
      //       loader: 'postcss-loader', // Run post css actions.
      //       options: {
      //         plugins: () => [// Post css plugins, can be exported to postcss.config.js
      //           require('precss'),
      //           require('autoprefixer')
      //         ]
      //       }
      //     },
      //     'sass-loader' // Compiles Sass to CSS.
      //   ]
      // },
    ],
    noParse: [
      /pdfjs-dist/
    ]
  },
  plugins: [
    new webpack.IgnorePlugin(/\blocale.*/, /\bmoment\b/),

    // new webpack.HotModuleReplacementPlugin(),
    // new webpack.NamedModulesPlugin(),

    new TsCheckerPlugin({
      checkSyntacticErrors: true,
      async: false,
      silent: false,
      memoryLimit: 2048,
      watch: ['./src'] // optional but improves performance (less stat calls)
    }),
    new HappyPack({
      id: 'ts',
      threadPool,
      loaders: [{
        loader: 'ts-loader',
        options: {
          happyPackMode: true
        }
      }]
    }),
    new HappyPack({
      id: 'json',
      loaders: ['json-loader'],
      threadPool
    }),
    // new HappyPack({
    //   id: 'css',
    //   loaders: ['css-loader?sourceMap&minimize&-autoprefixer&safe'],
    //   threadPool
    // })
  ]
};

export default config;
