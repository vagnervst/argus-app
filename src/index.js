import React from 'react';
import { render } from 'react-dom';
import nozaik from 'nozaik';
console.log(nozaik);
import config from './config';
import myextension from 'my-extension';
import githubExtension from 'github-extension';

console.log(githubExtension);

const { Nozaik } = nozaik.components;

nozaik.extensions.load([
  myextension,
  githubExtension
]);

console.log('loadedExtensions', nozaik.extensions.get());

render(
  <Nozaik config={config} />,
  document.querySelector("#nozaik")
)
