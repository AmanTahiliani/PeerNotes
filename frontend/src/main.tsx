import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './screens/Login.tsx';
import Signup from './screens/Signup.tsx';
import Results from './screens/Results.tsx';
import MainSearch from './screens/MainSearch.tsx';
import RegisterFile from './screens/RegisterFile.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      // add more routes here
      {
        path: "search",
        element: <MainSearch />,
      },
      {
        path: "results",
        element: <Results/>,
      },
      {
        path: "register",
        element: <RegisterFile />,
      },
    ]
  },
  
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
