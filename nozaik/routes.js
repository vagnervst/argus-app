var nServer = require('nozaik/server');

var myextension = require('my-extension/routes');
var githubExtension = require('github-extension/routes');

nServer.routes.add('my-extension', myextension);
nServer.routes.add('github-extension', githubExtension);
