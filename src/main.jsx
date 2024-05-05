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
import Payment from './routes/buying_tickets/payment.jsx';
import PaymentSummary from './routes/buying_tickets/payment_summary.jsx';
import Information from './routes/account/information.jsx';
import History from './routes/account/history.jsx';
import AdminAddMovie from './routes/admin/add_movie.jsx';

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
      {
        path: "movies/id/seats/payment",
        element: <Payment />,
      },
      {
        path: "movies/id/seats/payment/summary",
        element: <PaymentSummary />,
      },
      {
        path: "account",
        element: <Information />,
      },
      {
        path: "account/history",
        element: <History />,
      },
      {
        path: "admin/addmovie",
        element: <AdminAddMovie />,
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
