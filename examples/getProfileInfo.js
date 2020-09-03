var client = require('../lib/index');

var profileUrl = 'http://instagram.com/dnbradio';
client.getProfileInfo(profileUrl, function(error, profileInfo) {
  if (error) {
    console.log(error);
  } else {
    console.log(profileInfo);
  }
});
