const path = require('path');
const express = require('express');
const argus = require('@argus-dashboard/server');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
require('dotenv').config()

const githubExtension = require('@argus-dashboard/github-extension/routes');
const routes = require('./routes');

let app = express();

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', routes);

argus.routes.add('github-extension', githubExtension);
argus.server(app, { port: process.env.PORT || 3000 });
