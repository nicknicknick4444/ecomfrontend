import React from 'react';
import ReactDOM from 'react-dom/client';
import {Routes, Route, Router, BrowserRouter} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import App2 from './App';
import {ErrorBoundary} from "./components/errorBoundary.js";
import PropProvider from "./components/hooks/prop-hooks.js";
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.Fragment>
    {/* <ErrorBoundary> */}
    <PropProvider>
      <BrowserRouter>
        <App2 />
      </BrowserRouter>
    </PropProvider>
    {/* </ErrorBoundary> */}
  </React.Fragment>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
