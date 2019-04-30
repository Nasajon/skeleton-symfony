var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const devMode = process.env.NODE_ENV !== 'production'


function getPlugins() {
    var plugins = [
        new webpack.DefinePlugin({
            'process.env': {
                'nodeEnv': process.env.NODE_ENV
            }
        }),
        new MiniCssExtractPlugin({
            filename: devMode ? '[name].css' : '[name].[hash].css',            
        }),
        new HtmlWebpackPlugin({
            filename: path.resolve(__dirname, 'src/Nasajon/MDABundle/Resources/js/index.html'),
            template: path.resolve(__dirname, 'src/Nasajon/MDABundle/Resources/js/index.html')
        }),
        new webpack.SourceMapDevToolPlugin({
            filename: "sourcemap/[file].map"
        }),
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

    mode: getEnvironment(),

    resolve: {
        extensions: ['.ts', '.js']
    },

    optimization: {
        nodeEnv: process.env.NODE_ENV,
        minimizer: devMode ? [ new TerserPlugin({}) ] : [] 
    },

    entry: {
        vendor: [
          './node_modules/angular/angular.js',
          './node_modules/@uirouter/angularjs/release/angular-ui-router.js',
          './node_modules/angular-messages/angular-messages.min.js',
          './node_modules/angular-locale-pt-br/angular-locale_pt-br.js',
          './node_modules/angular-animate/angular-animate.min.js',
          './node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js',
          './node_modules/angular-sanitize/angular-sanitize.min.js',
          './node_modules/angular-moment/angular-moment.min.js',
          './node_modules/angularjs-toaster/toaster.min.js',
          './node_modules/ng-infinite-scroll/build/ng-infinite-scroll.min.js',
          './node_modules/ui-select/dist/select.min.js',
          './node_modules/moment/min/moment.min.js',
          './node_modules/moment-timezone/builds/moment-timezone-with-data-2010-2020.min.js',
          './node_modules/moment/locale/pt-br.js',
          './node_modules/ng-file-upload/dist/ng-file-upload.min.js',
          './node_modules/angular-file-input/dist/angular-file-input.min.js',
          './node_modules/angular-tree-dnd/dist/ng-tree-dnd.min.js',
          './node_modules/angular-ui-mask/dist/mask.min.js',
          './node_modules/angular-filter/dist/angular-filter.js',
          './node_modules/cpf_cnpj/build/cpf.js',
          './node_modules/cpf_cnpj/build/cnpj.js',
          './node_modules/checklist-model/checklist-model.js',
          './node_modules/nasajon-ui/src/nasajon-ui.ts',
          './node_modules/@fortawesome/fontawesome-free/js/all.js',
        ],
        css: [
            './assets/sass/style.scss',
            './node_modules/ui-select/dist/select.css',
            './node_modules/angular-tree-dnd/dist/ng-tree-dnd.css',
            './node_modules/@fortawesome/fontawesome-free/css/all.css',
        ],
        lib: [
            './vendor/friendsofsymfony/jsrouting-bundle/Resources/public/js/router.js',
            './node_modules/nasajon-ui/src/utils/nsj/globals/globals.min.js',
            './node_modules/nasajon-ui/src/utils/nsj-routing.js',
            './node_modules/nasajon-ui/src/forms/js/convert_to_number.js',
            './node_modules/nasajon-ui/src/forms/js/date_input.js',
            './node_modules/nasajon-ui/src/forms/js/filters.js',
            './node_modules/nasajon-ui/src/utils/is_state_filter.js',
            './node_modules/nasajon-ui/src/forms/select/mdauiselect.js',
            './node_modules/nasajon-ui/src/utils/debounce.js',
            './node_modules/nasajon-ui/src/tables/objectlist.js',
            './node_modules/nasajon-ui/src/forms/js/ui_mask_filter.js',
            './node_modules/nasajon-ui/src/forms/js/cpf_cnpj.js'
        ],
        mda: [
            './assets/js/mda-config.js',

            './src/Nasajon/MDABundle/Resources/js/Estados/config.js',
            './src/Nasajon/MDABundle/Resources/js/Estados/default.form.js',
            './src/Nasajon/MDABundle/Resources/js/Estados/default.form.show.js',
            './src/Nasajon/MDABundle/Resources/js/Estados/new.js',
            './src/Nasajon/MDABundle/Resources/js/Estados/show.js',
            './src/Nasajon/MDABundle/Resources/js/Estados/index.js',
            './src/Nasajon/MDABundle/Resources/js/Estados/edit.js',
            './src/Nasajon/MDABundle/Resources/js/Estados/factory.js',

            './src/Nasajon/MDABundle/Resources/js/Cidades/config.js',
            './src/Nasajon/MDABundle/Resources/js/Cidades/default.form.js',
            './src/Nasajon/MDABundle/Resources/js/Cidades/default.form.show.js',
            './src/Nasajon/MDABundle/Resources/js/Cidades/new.js',
            './src/Nasajon/MDABundle/Resources/js/Cidades/show.js',
            './src/Nasajon/MDABundle/Resources/js/Cidades/index.js',
            './src/Nasajon/MDABundle/Resources/js/Cidades/edit.js',
            './src/Nasajon/MDABundle/Resources/js/Cidades/factory.js',

            './src/Nasajon/MDABundle/Resources/js/Pessoas/config.js',
            './src/Nasajon/MDABundle/Resources/js/Pessoas/default.form.js',
            './src/Nasajon/MDABundle/Resources/js/Pessoas/default.form.show.js',
            './src/Nasajon/MDABundle/Resources/js/Pessoas/new.js',
            './src/Nasajon/MDABundle/Resources/js/Pessoas/show.js',
            './src/Nasajon/MDABundle/Resources/js/Pessoas/index.js',
            './src/Nasajon/MDABundle/Resources/js/Pessoas/edit.js',
            './src/Nasajon/MDABundle/Resources/js/Pessoas/factory.js',

            './src/Nasajon/MDABundle/Resources/js/Pessoascontatos/config.js',
            './src/Nasajon/MDABundle/Resources/js/Pessoascontatos/default.form.js',
            './src/Nasajon/MDABundle/Resources/js/Pessoascontatos/default.form.show.js',
            './src/Nasajon/MDABundle/Resources/js/Pessoascontatos/new.js',
            './src/Nasajon/MDABundle/Resources/js/Pessoascontatos/show.js',
            './src/Nasajon/MDABundle/Resources/js/Pessoascontatos/index.js',
            './src/Nasajon/MDABundle/Resources/js/Pessoascontatos/edit.js',
            './src/Nasajon/MDABundle/Resources/js/Pessoascontatos/factory.js'

        ],
        app: [
            './assets/js/app.js'
        ]
    },
    output: {
        filename: getEnvironment() === 'production' ? '[name]-[hash:6].min.js' : '[name].js',
        path: path.resolve(__dirname, './web/assets'),
        publicPath: '/assets/'
    },
plugins: getPlugins(),

module: {
    rules: [{
            test: /\.ts$/,
            use: [
                'awesome-typescript-loader'
            ]
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
            test: /\.json$/,
            loader: 'json-loader'
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
            test: /\.(svg|woff|woff2|eot|ttf)$/,
            use: 'file-loader?outputPath=fonts/',
        }
    ]
}

};

