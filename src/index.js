import React from 'react';
import { render } from 'react-dom';
import argus from 'argus';

// import config from './config';
// import myextension from 'my-extension';
import githubExtension from 'github-extension';

import App from './components/App';

// const { Argus } = argus.components;

argus.extensions.load([
  // myextension,
  githubExtension
]);

// console.log('loadedExtensions', argus.extensions.get());

render(
  <App />,
  document.querySelector("#argus")
)
