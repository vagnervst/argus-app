const path = require('path');
const express = require('express');
const argus = require('argus-server');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const githubExtension = require('github-extension/routes');
const routes = require('./routes');

let app = express();
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

argus.routes.add('github-extension', githubExtension);
argus.server(app, { port: process.env.PORT || 3000 });
