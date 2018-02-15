import React from 'react';
import { render } from 'react-dom';
import argus from 'argus';
console.log(argus);
import config from './config';
import myextension from 'my-extension';
import githubExtension from 'github-extension';

console.log(githubExtension);

const { Argus } = argus.components;

argus.extensions.load([
  myextension,
  githubExtension
]);

console.log('loadedExtensions', argus.extensions.get());

render(
  <Argus config={config} />,
  document.querySelector("#argus")
)
