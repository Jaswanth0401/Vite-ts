import React from 'react'
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import SecondPage from './Second page';

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<App/>} />
      <Route path="/second-page" element={<SecondPage/>} />
    </Routes>
  </Router>,
  document.getElementById('root')
);
