// Para importar modulos de node
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const isDevelopment = process.env.NODE_ENV !== 'production';
const mode = isDevelopment ? 'development' : 'production';
const devPlugins = !isDevelopment ? [] : [ new ReactRefreshWebpackPlugin() ];

// exportar archivos
module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "[name].[contenthash].js",
        path: path.resolve(__dirname, "dist"),
        publicPath: "/"
    },
    // especificar cuanto debe optimizar el codigo
    mode: mode,
    devServer: {
        port: 5001,
        open: true,
        /*
        * para que el servidor sepa que se hara un hot reload
        * y no recargue toda la pagina.
        */
        hot: true,
        /*
        * esto sirve para que si se entra a un path que no existe
        * redirija al index.
        */
        historyApiFallback: true
    },
    // especificar modulos
    module: {
        rules: [
            {
                use: "babel-loader",
                /*
                * expresion regular para que todos los archivos
                * terminados con esta extension sean procesados por babel
                */
                test: /.js$/,
                exclude: /node_modules/
            },
            {
                use: [MiniCssExtractPlugin.loader, "css-loader"],
                test: /.css$/
            },
            {
                type: "asset",
                test: /.(png|svg|jpg|jpeg|gif)$/i
            }
        ]
    },
    plugins: [
        ...devPlugins,
        new HtmlWebpackPlugin({
            template: "./public/index.html"
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash].css"
        })
    ]
}