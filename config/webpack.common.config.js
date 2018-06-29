const path = require('path');
const webpack = require('webpack');
const CleanPlugin = require('clean-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const commonPaths = require('./common-paths');

module.exports = env => {
    const environment = env.environment;

    const config = {
        entry: {
            main: ['./src/index.tsx']
        },
        output: {
            filename: '[name].js',
            path: commonPaths.outputPath
        },
        resolve: {
            extensions: ['.js', '.jsx', '.ts', '.tsx']
        },
        module: {
            rules: [
                {
                    enforce: 'pre',
                    test: /\.tsx?$/,
                    loader: 'tslint-loader',
                    exclude: /node_modules/
                },
                {
                    test: /\.tsx?$/,
                    use: ['babel-loader', 'ts-loader'],
                    exclude: /node_modules/
                },
                {
                    test: /\.s?css$/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: [
                            {
                                loader: 'css-loader',
                                options: {
                                    module: true,
                                    importLoaders: 1,
                                    localIdentName: '[name]_[local]_[hash:base64]',
                                    sourceMap: true,
                                    minimize: true,
                                    camelCase: true
                                }
                            },
                            {
                                loader: 'postcss-loader',
                                options: {
                                    plugins: [
                                        autoprefixer(),
                                    ],
                                },
                            },
                            {
                                loader: 'sass-loader'
                            },
                            // {
                            //     loader: 'sass-resources-loader',
                            //     options: {
                            //         resources: '../../src/styles/**/*.scss'
                            //     }
                            // }
                        ]
                    })
                },
                {
                    test: /\.(png|svg|jpg|gif)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: 'images/[name].[ext]'
                            }
                        }
                    ],
                    exclude: /node_modules/
                }
            ]
        },
        optimization: {
            splitChunks: {
                cacheGroups: {
                    commons: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all'
                    }
                }
            }
        },
        plugins: [
            new webpack.ProgressPlugin(),
            new ExtractTextPlugin('[name].css'),
            new CleanPlugin(['../dist'], { allowExternal: true }),
            new HtmlPlugin({
                filename: 'index.html',
                template: commonPaths.template,
                favicon: commonPaths.favicon,
                inject: true
            }),
            new webpack.NormalModuleReplacementPlugin(
                /^.*environment.ts$/,
                `./environment${environment ? '.' + environment : ''}.ts`,
            ),
        ]
    };

    return config;
};