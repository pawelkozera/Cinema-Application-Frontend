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
import Movies from './routes/movies/movies.jsx';
import MoviesDetails from './routes/movies_details/movies_details.jsx';
import SelectCinema from './routes/select_cinema/select_cinema.jsx';
import SelectSeats from './routes/buying_tickets/selecting_seats.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <SelectCinema />,
      },
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
      {
        path: "movies",
        element: <Movies />,
      },
      {
        path: "movies/id",
        element: <MoviesDetails />,
      },
      {
        path: "movies/id/seats",
        element: <SelectSeats />,
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
