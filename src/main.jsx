import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Helmet } from 'react-helmet-async';
import AuthProvider from './Providers/AuthProvider';
import Main from './Layout/Main';
import Login from './Pages/Login/Login';
import SignUp from './Pages/SignUp/SignUp';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children:[

    ]
  },
  {
    path: '/login',
    element: <Login></Login>,
  },
  {
    path: '/signup',
    element: <SignUp></SignUp>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Helmet>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </Helmet>
  </React.StrictMode>,
)
