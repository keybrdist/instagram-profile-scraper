var cheerio = require('cheerio');
var scrapeIt = require("scrape-it");
var urlHelper = require('url');
var linez = require('linez');
var JSON5 = require('json5');

linez.configure({
  newlines: ['\n', '\r\n', '\r']
});


var assignProps = function (objFrom, objTo, propNames) {
  propNames.forEach(function (propName) {
    objTo[propName] = objFrom[propName];
  });
  return objTo;
};



// parse profile info
exports.parseProfileInfo = function (html, profileUrl) {
  var $ = cheerio.load(html);
  var data = scrapeIt.scrapeHTML($, {
    head: {
      selector: 'head',
      data: {
        name:  { selector: "meta[property='og:title']", attr: 'content' },
        description: { selector: "meta[property='og:description']", attr: 'content' },
        url: { selector: "meta[property='og:url']", attr: 'content' },
        imageUrl: { 
          selector: "meta[property='og:image']", 
          attr: 'content',
          convert: function (src) {
            if (src) {
              return src;
            }
          } 
        },
      }
    },
  });
  var object = assignProps(data.head, {}, ['name', 'description', 'url', 'imageUrl']);
  object.url = profileUrl;
  return object;
};
