/**
 * Populate DB with sample data on server start and ensure DB has at least
 * an `Admin` and `Test User`.
 * Edit config/environment/index.js, and set `seedDB: 'seed-partial.js` to include

 */

'use strict';

// var Thing = require('../api/thing/thing.model');
var User = require('../api/user/user.model');
var config = require('../config/environment');
var fs = require('fs-extra');

// bootstrap our `tmp` directory
fs.ensureDir( process.env.TMPDIR,  function(err) {
  if ( err ) return console.error(err);
  //dir has now been created, including the directory it is to be placed in
  console.log( '\''+process.env.TMPDIR+'\' directory created if it didn\'t already exist');
});

// bootstrap our uploads directory
fs.ensureDir( config.uploadPath + '/profiles',  function(err) {
  if ( err ) return console.error(err);
  //dir has now been created, including the directory it is to be placed in
  console.log('\''+config.uploadPath+'/profiles\' directory created if it didn\'t already exist');
});

User.findOne({name:'Admin'}, function(err, user) {
  if ( !user ) {
    User.create({
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      email: 'admin@admin.com',
      password: 'Admin123'
    }, function() {
      console.log('created \'Admin\' user');
    });
  }
});
User.findOne({name:'Test User'}, function(err, user) {
  if ( !user ) {
    User.create({
      provider: 'local',
      name: 'Test User',
      email: 'test@test.com',
      password: 'Testing123'
    }, function() {
      console.log('created \'Test User\' user');
    });
  }
});
