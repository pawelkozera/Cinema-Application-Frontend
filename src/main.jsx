import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Root from "./routes/root/root.jsx";
import Login from './routes/login/Login.jsx';
import Register from './routes/register/Register.jsx';
import Pricelist from './routes/pricelist/pricelist.jsx'
import Faq from './routes/faq/faq.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "pricelist",
        element: <Pricelist />,
      },
      {
        path: "faq",
        element: <Faq />,
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
