require('dotenv').config()
const path = require('path');
const express = require('express');
const webpack = require('webpack');
const middleware = require('webpack-dev-middleware');
const argus = require('@argus-dashboard/server');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const githubExtension = require('@argus-dashboard/github-extension/routes');

const webpackConfig = require('./webpack.config');
const compiler = webpack(webpackConfig);
const routes = require('./routes');

let app = express();

app.use(express.static('public'));
app.use(middleware(compiler));
app.use(require('webpack-hot-middleware')(compiler));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', routes);

argus.routes.add('github-extension', githubExtension);
argus.server(app, { port: process.env.PORT || 3000 });
