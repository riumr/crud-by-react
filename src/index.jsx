import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './Component/home';
import {Detail} from './Component/detail';
import Update from './Component/update';
import {Create} from './Component/create';
import reportWebVitals from './reportWebVitals';

const router = createBrowserRouter([
    {
      path:"/" ,
      element:<Home/>,
    },
    {
      path:"/create",
      element:<Create/>
    },
    {
      path:"/detail/:id",
      element:<Detail/>,
    },
    {
      path:"/update/:id",
      element:<Update/>
    }
])


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

reportWebVitals();
