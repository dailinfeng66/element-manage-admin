module.exports = {
    baseUrl: './',
    assetsDir: 'static',
    productionSourceMap: false,
    devServer: {
        proxy: {
            '/dev-api': {
                // target: 'http://39.101.142.204:20119/',
                target: 'http://127.0.0.1:10086/',
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