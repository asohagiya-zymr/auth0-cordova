var BrowserAgent = require('./browser');
var WebViewAgent = require('./webview');

module.exports = function getAgent(callback) {
    return callback(null, new WebViewAgent());
};

