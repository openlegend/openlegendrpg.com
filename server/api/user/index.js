'use strict';

var auth = require(__base + 'api/auth/auth.service');
var server = require(__base + 'server');
var controller = require('./user.controller');

server.get('/api/users', auth.hasRole('admin'), controller.index);
server.del('/api/users/:id', auth.hasRole('admin'), controller.destroy);
server.get('/api/users/me', auth.isAuthenticated(), controller.me);
server.put('/api/users/:id/password', auth.isAuthenticated(), controller.changePassword);
server.get('/api/users/:id', auth.isAuthenticated(), controller.show);
server.post('/api/users', controller.create);
server.post('/api/users/photo', auth.isAuthenticated(), controller.uploadProfilePhoto);
