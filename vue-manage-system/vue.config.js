module.exports = {
    baseUrl: './',
    assetsDir: 'static',
    productionSourceMap: false,
    devServer: {
        proxy: {
            '/dev-api': {
                // target: 'http://39.101.142.204:20119/',
                // target: 'http://39.99.197.88:20119/',
                changeOrigin: true,
                pathRewrite: {
                    '/dev-api': ''
                }
            }
            // '/image': {
            //     // target: 'http://39.101.142.204:20119/',
            //     target: 'https://www.youji999.top/',
            //     changeOrigin: true,
            //     pathRewrite: {
            //         '/image': ''
            //     }
            // }
        }
    }
};