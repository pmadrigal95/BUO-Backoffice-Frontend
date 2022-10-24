module.exports = {
    configureWebpack: (config) => {
        if (process.env.NODE_ENV === 'development') {
            config.devtool = 'eval-source-map';

            config.output.devtoolModuleFilenameTemplate = (info) =>
                info.resourcePath.match(/^\.\/\S*?\.vue$/)
                    ? `webpack-generated:///${info.resourcePath}?${info.hash}`
                    : `webpack-yourCode:///${info.resourcePath}`;

            config.output.devtoolFallbackModuleFilenameTemplate =
                'webpack:///[resource-path]?[hash]';
        }
    },

    productionSourceMap: false,
    publicPath:
        process.env.NODE_ENV === 'production'
            ? '/wallet'
            : '/' /* Pendiente cargar desde contexto */,
    transpileDependencies: ['vuetify'],
};
