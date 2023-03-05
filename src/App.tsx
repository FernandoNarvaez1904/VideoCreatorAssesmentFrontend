import React from 'react';
import Register from "./pages/Register";
import Login from "./pages/Login";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Videos from "./pages/Videos";

function App() {
  const routes = createBrowserRouter([
    {
      path: '/login',
      element: <Login/>,
    },
    {
      path: '/register',
      element: <Register/>,
    },
    {
      path: '/videos',
      element: <Videos/>,
    }
  ]);
  return <RouterProvider router={routes}/>;
}

export default App;
