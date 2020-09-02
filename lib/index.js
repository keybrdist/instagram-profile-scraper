var req         = require("tinyreq"),
    urlHelper   = require('url'),
    htmlParser  = require('./htmlParser.js');


exports.getProfileInfo = function (url, cb) {
  req(url, function (error, html) {
    if (error) {
      cb(error, null);
    } else {
      var info = htmlParser.parseProfileInfo(html, url);
      cb(null, info);
    }
  });
};``