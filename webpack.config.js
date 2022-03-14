// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path");
const fs = require("fs");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WorkboxWebpackPlugin = require("workbox-webpack-plugin");
const appDir = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDir, relativePath);
const { ModuleFederationPlugin } = require('webpack').container;

const isProduction = process.env.NODE_ENV == "production";

const stylesHandler = isProduction
  ? MiniCssExtractPlugin.loader
  : "style-loader";

const config = {
  entry: [
    "./src/index.ts",
  ],
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "/"
  },
  // modules: ['node_modules', resolveApp('node_modules')].concat(
  //     process.env.NODE_PATH.split(path.delimiter).filter(Boolean)
  // ),
  // externalsPresets: { node: true }, // in order to ignore built-in modules like path, fs, etc.
  // externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html",
    }),
    new ModuleFederationPlugin(
      {
        name: 'mfhost',
        filename: 'remoteEntry.js',
        exposes: {
          AboutHost: './src/About/About.tsx'
        },
        remotes: {
          plphost: 'plphost@http://localhost:3001/remoteEntry.js'
        }
      }
    )

    // Add your plugins here
    // Learn more about plugins from https://webpack.js.org/configuration/plugins/
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        loader: "ts-loader",
        exclude: ["/node_modules/"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [stylesHandler, "css-loader", "postcss-loader", "sass-loader"],
      },
      {
        test: /\.css$/i,
        use: [stylesHandler, "css-loader", "postcss-loader"],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
      },

      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".json"],
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";

    config.plugins.push(new MiniCssExtractPlugin());

    config.plugins.push(new WorkboxWebpackPlugin.GenerateSW());
  } else {
    config.mode = "development";
    config.devtool = 'inline-source-map';
    config.devServer = {
      hot: true,
      open: true
    };

    config.entry = [
      "webpack-hot-middleware/client?timeout=10000&reload=true",
      "./src/index.ts",
    ];

    config.plugins.push(
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),

      // Add your plugins here
      // Learn more about plugins from https://webpack.js.org/configuration/plugins/
    )
  }
  return config;
};
