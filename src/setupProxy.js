const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    const API_HOST = process.env.REACT_APP_LOCAL_IP || 'localhost';
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
};