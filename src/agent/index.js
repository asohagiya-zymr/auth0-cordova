var BrowserAgent = require('./browser');
var WebViewAgent = require('./webview');

module.exports = function getAgent(callback) {
  return BrowserAgent.isAvailable(function (available) {
    return callback(null, new WebViewAgent());
  });
};

