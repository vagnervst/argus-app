var aServer = require('argus-server');

var githubExtension = require('github-extension/routes');

aServer.routes.add('github-extension', githubExtension);
