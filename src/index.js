import React from 'react';
import { render } from 'react-dom';
import argus from 'argus';

import githubExtension from 'github-extension';

import App from './components/App';

argus.extensions.load([
  githubExtension
]);

render(
  <App />,
  document.querySelector("#argus")
)
