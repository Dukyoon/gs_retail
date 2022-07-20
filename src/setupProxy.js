const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    const API_HOST = process.env.REACT_APP_LOCAL_IP || 'localhost';
    console.log("API_HOST : ", API_HOST);
    app.use(
        createProxyMiddleware('/post', {
            target: 'http://' + API_HOST + ':8080',
            changeOrigin: true,
        })
    );
    app.use(
        createProxyMiddleware('/get', {
            target: 'http://' + API_HOST + ':8080',
            changeOrigin: true,
        })
    );
    app.use(
        createProxyMiddleware('/operMng', {
            target: 'http://' + API_HOST + ':8080',
            changeOrigin: true,
        })
    );
    app.use(
        createProxyMiddleware('/operMng/fileUploadTest', {
            target: 'http://' + API_HOST + ':8080',
            changeOrigin: true,
        })
    );
    app.use(
        createProxyMiddleware('/operMng/fileUploadTest/fileUploadToS3', {
            target: 'http://' + API_HOST + ':8080',
            changeOrigin: true,
        })
    );
};