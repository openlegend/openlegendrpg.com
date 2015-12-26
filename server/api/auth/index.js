'use strict';

var config = require(__base + 'config/environment');
var User = require(__base + 'api/user/user.model');

// Passport Configuration
require('./local/local.passport').setup(User, config);
// require('./stormpath/stormpath.passport').setup(User, config);
// require('./facebook/passport').setup(User, config);
// require('./google/passport').setup(User, config);
// require('./twitter/passport').setup(User, config);

require('./local');
// require('./stormpath');
