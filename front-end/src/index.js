import React from "react";
import ReactDOM from "react-dom";
import App from './components/App.js';

var mountNode = document.getElementById("app");
ReactDOM.render(<App/>, mountNode);

// I have no idea what this does
if (module.hot) {
    module.hot.accept();
}
