import { h, render, Component } from 'preact';
import App from './components/app';
import './index.scss';

import './assets/fonts/futura.scss'



render(<App />, document.body);


// // root holds our app's root DOM Element:
// let root;
//
// function init() {
//   root = render(<App />, document.body, root);
// }
// init();
//
// // example: Re-render on Webpack HMR update:
// if (module.hot) module.hot.accept('./components/app', init);
