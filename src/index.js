if(module.hot) {
  module.hot.accept();
}

import React from 'react';
import { render } from 'react-dom';
import argus from '@argus-dashboard/components';

import githubExtension from '@argus-dashboard/github-extension';
import defaultTheme from '@argus-dashboard/skin';

import createBrowserHistory from 'history/createBrowserHistory'
import { HashRouter, Route, Switch } from 'react-router-dom'
import { CookiesProvider } from 'react-cookie';

import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';

argus.extensions.load([
  githubExtension
]);

argus.themes.add({
  name: 'default',
  styles: defaultTheme
})

argus.themes.setCurrent('default')

const router = (
  <HashRouter forceRefresh={true}>
    <div>
      <Route exact path="/" render={() => <CookiesProvider><LoginForm /></CookiesProvider>} />
      <Route exact path="/dashboard" render={() => <CookiesProvider><Dashboard /></CookiesProvider>} />
    </div>
  </HashRouter>
)

render(
  router,
  document.querySelector("#argus")
)
