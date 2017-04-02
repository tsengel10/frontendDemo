"use strict";

let webpack = require('webpack');
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let yargs = require('yargs');
let startMockServer = require('./mock-backend/mock-server');
let appConfig = require('./app-config.json');
let packageJson = require('./package.json');
let fs = require('fs');
var autoprefixer = require('autoprefixer');
var sassLintPlugin = require('sasslint-webpack-plugin');
let layoutTemplate = fs.readFileSync(`./app/layout.html`, { encoding: "utf8" });
let mainContent = fs.readFileSync("./app/main-content.html");

let flags = yargs.argv;
let env = flags.env;

let port = 8090;

if (process.argv[1].indexOf("webpack-dev-server") !== -1) {
    startMockServer();
}

let tsLintOptions = null;

if (flags.ci) {
    tsLintOptions = {
        formatter: "checkstyle",
        formattersDirectory: "./node_modules/tslint-checkstyle-reporter/src/",
        fileOutput: {
            dir: "./build/reports/tslint/",
            ext: "xml",
            clean: true,
            header: "<?xml version='1.0' encoding='utf-8'?>\n<checkstyle version='5.7'>",
            footer: "</checkstyle>"
        }
    };
}

module.exports = {
    entry: "./app/entry.ts",
    output: {
        path: path.join(__dirname, 'public'),
        filename: "app.[hash].js"
    },
    module: {
        preLoaders: [
            { test: /\.ts$/, loader: 'tslint' }
        ],
        loaders: [
            { test: /\.ts$/, loader: "ng-annotate!ts" },
            { test: /\.html$/, loader: "ngtemplate?relativeTo=app/!html" },
            { test: /\.json$/, loader: "json" },
            { test: /\.scss$/, loader: "style!css!postcss!sass?sourceMap"},
            { test: /\.(gif|jpg|png|woff|woff2|eot|ttf|svg)$/, loader: require.resolve("url-loader") + '?limit=10000' }
        ]
    },
    postcss: function () {
        return [autoprefixer({ browsers: ["Chrome >= 40", "Edge >= 1", "ie >= 11", "ff >= 36", "Safari >= 8", "last 2 versions"] })];
    },
    externals: [
        "angular",
        { "angular-route": "ngRoute" },
        { "angular-aria": "ngAria"}
    ],
    resolve: {
        extensions: ["", ".webpack.js", ".web.js", ".js", ".ts"]
    },
    devtool: 'source-maps',
    devServer: {
        port: 8090,
        publicPath: "/demo/",
        contentBase: path.join(__dirname, 'public'),
        noInfo: true,
        proxy: { "*": "http://localhost:3005" }
    },
    plugins: [new HtmlWebpackPlugin({
        ngAppName: "App",
        title: 'Demo',
        templateContent: layoutTemplate,
        mainContent: mainContent,
        cdnResources: {
            js: {
                "angular" : "https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.0/angular.js",
                "angular-route" : "https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.0/angular-route.js",
                "angular-aria" : "https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.0/angular-aria.js"
            }
        },
        minify: {
            removeComments: true,
            removeCommentsFromCDATA: true,
            removeCDATASectionsFromCDATA: true,
            collapseWhitespace: true,
            conservativeCollapse: true,
            collapseInlineTagWhitespace: true,
            collapseBooleanAttributes: true,
            removeTagWhitespace: true,
            preventAttributesEscaping: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            caseSensitive: true
        }
    }),
        new sassLintPlugin({
            configFile: '.sass-lint.yml',
            context: 'app/'
        }),
        new webpack.DefinePlugin({
            CONFIG: JSON.stringify(appConfig[env])
        })],
    tslint: tsLintOptions
};