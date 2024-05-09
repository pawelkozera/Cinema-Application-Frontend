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
import AdminEditMovie from './routes/admin/edit_movie.jsx';
import AdminDeleteMovie from './routes/admin/delete_movie.jsx';
import AdminAddMovieHours from './routes/admin/add_movie_hours.jsx';
import AdminDeleteMovieHours from './routes/admin/delete_movie_hours.jsx';

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
        path: ":cinemaName/login",
        element: <Login />,
      },
      {
        path: ":cinemaName/register",
        element: <Register />,
      },
      {
        path: ":cinemaName/pricelist",
        element: <Pricelist />,
      },
      {
        path: ":cinemaName/faq",
        element: <Faq />,
      },
      {
        path: ":cinemaName/movies",
        element: <Movies />,
      },
      {
        path: ":cinemaName/movies/:movieId",
        element: <MoviesDetails />,
      },
      {
        path: ":cinemaName/movies/:movieId/:scheduleId",
        element: <SelectSeats />,
      },
      {
        path: ":cinemaName/movies/:movieId/:scheduleId/payment",
        element: <Payment />,
      },
      {
        path: ":cinemaName/movies/:movieId/:scheduleId/payment/:ticketUUID",
        element: <PaymentSummary />,
      },
      {
        path: ":cinemaName/account",
        element: <Information />,
      },
      {
        path: ":cinemaName/history",
        element: <History />,
      },
      {
        path: ":cinemaName/admin/addmovie",
        element: <AdminAddMovie />,
      },
      {
        path: ":cinemaName/admin/editmovie",
        element: <AdminEditMovie />,
      },
      {
        path: ":cinemaName/admin/deletemovie",
        element: <AdminDeleteMovie />,
      },
      {
        path: ":cinemaName/admin/addmoviehours",
        element: <AdminAddMovieHours />,
      },
      {
        path: ":cinemaName/admin/deletemoviehours",
        element: <AdminDeleteMovieHours />,
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
