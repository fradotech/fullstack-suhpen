const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = (env, argv) => {
  const devMode = argv.mode === 'development'

  return {
    mode: argv.mode,
    devtool: devMode && 'inline-source-map',
    devServer: {
      contentBase: './dist',
      historyApiFallback: true,
    },
    entry: './client/index.tsx',
    output: {
      path: path.resolve(__dirname, '/dist'),
      filename: '[name].bundle.js',
      chunkFilename: '[id].js',
      publicPath: '/',
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    module: {
      rules: [
        {
          include: path.resolve(__dirname, './client'),
          test: /\.tsx?$/,
          use: 'babel-loader',
          exclude: /node_modules/,
        },
        {
          include: path.resolve(__dirname, './client'),
          test: /\.js$/,
          loader: 'babel-loader',
        },
        {
          test: /\.(jpe?g|png|gif|woff|woff2|otf|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 1000,
                name: 'assets/img/[name].[ext]',
              },
            },
          ],
        },
        {
          include: path.resolve(__dirname, './client'),
          test: /\.css$/,
          oneOf: [
            // CSS Raw
            {
              resourceQuery: /raw/,
              use: ['style-loader', 'css-loader'],
            },
            // CSS Module
            {
              use: [
                require.resolve('style-loader'),
                {
                  loader: require.resolve('css-loader'),
                  options: {
                    importLoaders: 1,
                    modules: true,
                    modules: {
                      localIdentName: '[name]__[local]__[hash:base64:5]',
                    },
                  },
                },
              ],
            },
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: __dirname + '/client/index.html',
        filename: 'index.html',
        inject: 'body',
      }),
    ],
  }
}
