/**
 * @file entry of this example.
 */
import React from 'react';
import ReactDom from 'react-dom';
import App from './App';

export function bootstrap(mountTo: HTMLElement) {
    ReactDom.render(<App />, mountTo);
}
