var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const glob = require('glob');
const devMode = process.env.NODE_ENV !== 'production'


function getPlugins() {
    var plugins = [
        new webpack.DefinePlugin({
            'process.env': {
                'nodeEnv': process.env.NODE_ENV
            }
        }),
        new MiniCssExtractPlugin({
            filename: devMode ? '[name].css' : '[name].[hash:6].min.css',            
        }),
        new HtmlWebpackPlugin({
            filename: path.resolve(__dirname, 'src/Nasajon/MDABundle/Resources/js/index.html'),
            template: path.resolve(__dirname, 'src/Nasajon/MDABundle/Resources/js/index.html')
        }),
        // new webpack.SourceMapDevToolPlugin({
        //     filename: "sourcemap/[file].map"
        // }),
        new LoaderOptionsPlugin({
            debug: true,
            options: {
                tslint: {
                    configuration: require('./tslint.json'),
                    typeCheck: true
                }
            }
        })
    ];

    return plugins;
}


function getEnvironment () {
  return process.env.NODE_ENV;
}


module.exports = {

    mode: process.env.NODE_ENV,

    resolve: {
        extensions: ['.ts', '.js'],
        cacheWithContext: false,
        symlinks: false
    },

    optimization: {
        removeAvailableModules: false,
        removeEmptyChunks: false,
        splitChunks: false,
        minimizer: [new TerserPlugin({})]
    },

    entry: {
        vendor: [

            //Recursos do AngularJS
            './node_modules/@uirouter/angularjs/release/angular-ui-router.min.js',
            './node_modules/angular-messages/angular-messages.min.js',
            './node_modules/angular-animate/angular-animate.min.js',
            './node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js',
            './node_modules/angular-sanitize/angular-sanitize.min.js',
            './node_modules/angular-moment/angular-moment.min.js',
            './node_modules/angularjs-toaster/toaster.min.js',
            './node_modules/angular-file-input/dist/angular-file-input.min.js',
            './node_modules/angular-ui-mask/dist/mask.min.js',
            './node_modules/angular-filter/dist/angular-filter.min.js',
            './node_modules/angular-locale-pt-br/angular-locale_pt-br.js',

            //Recursos dependentes do AngularJS
            './node_modules/ui-select/dist/select.min.js',
            './node_modules/moment/min/moment.min.js',
            './node_modules/moment/locale/pt-br.js',
            './node_modules/moment-timezone/builds/moment-timezone-with-data-2010-2020.min.js',
            './node_modules/multiple-date-picker/dist/multipleDatePicker.min.js',
          
            //Symfony
            './vendor/friendsofsymfony/jsrouting-bundle/Resources/public/js/router.js',

            //Nasajon-ui
            './node_modules/nasajon-ui/lib/nasajon-ui.ts',

            //Compatibilidade Nasajon-ui
            './node_modules/nasajon-ui/nasajon-ui-old/utils/nsj/globals/globals.min.js',
            './node_modules/nasajon-ui/nasajon-ui-old/utils/nsj-routing.js',
            './node_modules/nasajon-ui/nasajon-ui-old/utils/is_state_filter.js',
            './node_modules/nasajon-ui/nasajon-ui-old/utils/debounce.js',
            './node_modules/nasajon-ui/nasajon-ui-old/forms/select/mdauiselect.js',
            './node_modules/nasajon-ui/nasajon-ui-old/tables/objectlist.js',
            './node_modules/nasajon-ui/nasajon-ui-old/forms/js/convert_to_number.js',
            './node_modules/nasajon-ui/nasajon-ui-old/forms/js/date_input.js',
            './node_modules/nasajon-ui/nasajon-ui-old/forms/js/filters.js',
            './node_modules/nasajon-ui/nasajon-ui-old/forms/js/ui_mask_filter.js',
            './node_modules/nasajon-ui/nasajon-ui-old/forms/js/cpf_cnpj.js',
            
            './assets/js/app.module.ts',

        ],
        styles: [
            './assets/sass/style.scss',
            './node_modules/@fortawesome/fontawesome-free/css/all.css',
            './node_modules/multiple-date-picker/dist/multipleDatePicker.css',
        ],

        mda: glob.sync("./src/Nasajon/MDABundle/Resources/js/**/*.ts", {
            ignore: [ ]
        }),

        //custom: glob.sync("./assets/js/custom/**/*.ts"),
    },

   output: {

        filename: devMode ? '[name].js' : '[name]-[hash:6].min.js',
        path: path.resolve(__dirname, './web/assets'),
        publicPath: '/assets/'
    },

plugins: getPlugins(),

module: {
    rules: [

        {
            include: [
                path.resolve(__dirname, 'assets/js'),
                path.resolve(__dirname, 'src/Nasajon/MDABundle/Resources/js'),
                path.resolve(__dirname, 'node_modules/nasajon-ui')
            ],

            test: /\.ts$/,
            use: [
                {
                    loader: 'ts-loader',
                    options: {
                        transpileOnly: true,
                        experimentalWatchApi: true,
                        happyPackMode: true
                    },
                },
            ],


        },
        {
            test: /\.(sa|sc|c)ss$/,
            use: [
                MiniCssExtractPlugin.loader, {
                    loader: 'css-loader',
                    options: {
                        sourceMap: true
                    }
                },
                {
                    loader: "resolve-url-loader",
                    options: {
                        keepQuery: true,
                        sourceMap: true,
                        sourceMapContents: false
                    }
                },
                {
                    loader: 'sass-loader',
                    options: {
                        minimize: true,
                        sourceMap: true
                    }
                }
            ]
        },
        {
            test: /\.html$/,
            include: /node_modules/,
            use: [{
                loader: 'html-loader',
                options: {
                    minimize: true
                }
            }]
        },
        {
            test: /\.json$/,
            loader: 'json-loader'
        },
        {
            test: /\.(jpg|png)$/,
            include: [
                path.resolve(__dirname, 'assets/img')
            ],
            use: {
                loader: "url-loader",
                options: {
                    name: 'img/[name].[ext]'
                },
            },
        },
        {
            test: /\.(svg|woff|woff2|eot|ttf)$/,
            use: 'file-loader?outputPath=fonts/',
        }
    ]
}

};

