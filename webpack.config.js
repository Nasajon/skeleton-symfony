var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
var isProd = (process.env.NODE_ENV === 'production');
var glob = require("glob");
const ExtractTextPlugin = require('extract-text-webpack-plugin');


function getPlugins() {
    var plugins = [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': process.env.NODE_ENV
            }
        }),
        new ExtractTextPlugin({
            filename: isProd ? '[name]-[contenthash].min.css' : 'style.css'
        }),
        new HtmlWebpackPlugin({
            filename: path.resolve(__dirname, 'src/Nasajon/MDABundle/Resources/js/index.html'),
            template: path.resolve(__dirname, 'src/Nasajon/MDABundle/Resources/js/index.html')
        }),
        new webpack.SourceMapDevToolPlugin({
            filename: "sourcemap/[file].map"
        })
    ];

    if (isProd) {
        plugins.push(new webpack.optimize.UglifyJsPlugin({
            sourceMap: true
        }));
    }

    return plugins;
}


module.exports = {
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
            './node_modules/angular-ui-mask/dist/mask.min.js',
            './node_modules/angular-filter/dist/angular-filter.js',
            './node_modules/cpf_cnpj/build/cpf.js',
            './node_modules/cpf_cnpj/build/cnpj.js',
            './node_modules/checklist-model/checklist-model.js'
        ],
        css: [
            './assets/sass/style.scss',
            './vendor/nasajon/componentes-interface-bundle/Nasajon/ComponentesInterfaceBundle/Resources/public/angular-modules/modules/angularModules.scss',
            './vendor/nasajon/componentes-interface-bundle/Nasajon/ComponentesInterfaceBundle/Resources/css/default.css',
            './vendor/nasajon/componentes-interface-bundle/Nasajon/ComponentesInterfaceBundle/Resources/css/height-full.css',
            './vendor/nasajon/componentes-interface-bundle/Nasajon/ComponentesInterfaceBundle/Resources/css/headlines.css',
            './vendor/nasajon/componentes-interface-bundle/Nasajon/ComponentesInterfaceBundle/Resources/css/panels-and-lists.css',
            './vendor/nasajon/componentes-interface-bundle/Nasajon/ComponentesInterfaceBundle/Resources/css/forms.css',
            './vendor/nasajon/componentes-interface-bundle/Nasajon/ComponentesInterfaceBundle/Resources/css/nav.css',
            './vendor/nasajon/componentes-interface-bundle/Nasajon/ComponentesInterfaceBundle/Resources/css/botoes.css',
            './vendor/nasajon/componentes-interface-bundle/Nasajon/ComponentesInterfaceBundle/Resources/css/icons-alerts-infos.css',
            './node_modules/ui-select/dist/select.css'
        ],
        lib: [
            './vendor/friendsofsymfony/jsrouting-bundle/Resources/public/js/router.js',
            './vendor/nasajon/componentes-interface-bundle/Nasajon/ComponentesInterfaceBundle/Resources/js/nsj-routing.js',
            './vendor/nasajon/componentes-interface-bundle/Nasajon/ComponentesInterfaceBundle/Resources/js/convert_to_number.js',
            './vendor/nasajon/componentes-interface-bundle/Nasajon/ComponentesInterfaceBundle/Resources/js/date_input.js',
            './vendor/nasajon/componentes-interface-bundle/Nasajon/ComponentesInterfaceBundle/Resources/js/filters.js',
            './vendor/nasajon/componentes-interface-bundle/Nasajon/ComponentesInterfaceBundle/Resources/js/is_state_filter.js',
            './vendor/nasajon/componentes-interface-bundle/Nasajon/ComponentesInterfaceBundle/Resources/js/debounce.js',
            './vendor/nasajon/componentes-interface-bundle/Nasajon/ComponentesInterfaceBundle/Resources/js/mdauiselect.js',
            './vendor/nasajon/componentes-interface-bundle/Nasajon/ComponentesInterfaceBundle/Resources/js/objectlist.js',
            './vendor/nasajon/componentes-interface-bundle/Nasajon/ComponentesInterfaceBundle/Resources/js/ui_mask_filter.js',
            './vendor/nasajon/componentes-interface-bundle/Nasajon/ComponentesInterfaceBundle/Resources/js/cpf_cnpj.js'
        ],
        mda: [
            './assets/js/mda-config.js',
            './src/Nasajon/MDABundle/Resources/js/Tenants/config.js',
            './src/Nasajon/MDABundle/Resources/js/Tenants/index.js',
            './src/Nasajon/MDABundle/Resources/js/Tenants/edit.js',
            './src/Nasajon/MDABundle/Resources/js/Tenants/factory.js'

        ],
        angularmodules: [
            './vendor/nasajon/componentes-interface-bundle/Nasajon/ComponentesInterfaceBundle/Resources/public/angular-modules/modules/angularModules.js',
            './vendor/nasajon/componentes-interface-bundle/Nasajon/ComponentesInterfaceBundle/Resources/public/angular-modules/modules/nsjMenu/nsjMenu.js',
            './vendor/nasajon/componentes-interface-bundle/Nasajon/ComponentesInterfaceBundle/Resources/public/angular-modules/modules/appLoad/appLoad.js',
            './vendor/nasajon/componentes-interface-bundle/Nasajon/ComponentesInterfaceBundle/Resources/public/angular-modules/modules/nsjHeader/nsjHeader.js',
            './vendor/nasajon/componentes-interface-bundle/Nasajon/ComponentesInterfaceBundle/Resources/public/angular-modules/modules/nsjTable/nsjTable.js',
            './vendor/nasajon/componentes-interface-bundle/Nasajon/ComponentesInterfaceBundle/Resources/public/angular-modules/modules/tableFixedColumn/tableFixedColumn.js'
        ],
        app: [
            './assets/js/app.js'
        ]
    },
    output: {
        filename: isProd ? '[name]-[hash:6].min.js' : '[name].js',
        path: path.resolve(__dirname, './web/assets'),
        publicPath: '/assets/'
    },
    plugins: getPlugins(),
    module: {
        loaders: [
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.html$/,
                use: [{
                        loader: 'html-loader',
                        options: {
                            minimize: true
                        }
                    }],
            },
            {
                test: /\.css$/,
                loader: 'css-loader',
                options: {
                    minimize: true || {/* CSSNano Options */}
                }
            }
        ],
        rules: [
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader']
                })
            }
        ]
    }
};

