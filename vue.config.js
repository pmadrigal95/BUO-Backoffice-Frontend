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
            ? '/backoffice'
            : '/' /* Pendiente cargar desde contexto */,
    transpileDependencies: ['vuetify'],

    /*devServer: {
        open: process.platform === 'darwin',
        host: '0.0.0.0',
        port: 8080, // CHANGE YOUR PORT HERE!
        https: true,
        hotOnly: false,
    },*/
};
