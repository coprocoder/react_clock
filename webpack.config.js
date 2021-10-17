const path = require("path");

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  // mode: "production",
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: "bundle.js"
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    // host: '0.0.0.0',      
    host: 'localhost',      
    port: 3000, 
    open: true,           // Открыть бразуер
    allowedHosts: 'auto', // localhost
    // https: true,          // Самоподписанный сертификат
    client: {   
      overlay: {
        errors: true,
        warnings: false,
      },
    }
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"]
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true
            }
          }
        ]
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              implementation: require("node-sass"),
            },
          },
        ],
      },
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.scss'],
    modules: ['node_modules', 'src'],
  },
};