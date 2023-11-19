import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './style.css';
import App from './App';
import Detail, {loader as detailLoader} from './Component/detail';
import Update from './Component/update';
import Create from './Component/create';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App/>}></Route>
        <Route path="/create" element={<Create/>}></Route>
        <Route path="/detail/:id" element={<Detail/>}/>
        <Route path="/update/:id" element={<Update/>}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
