'use strict';

// Development specific configuration
// ==================================
module.exports = {
  baseUrl: 'http://localhost:9000',
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/open-legend'
  },

  seedDB: true
};
