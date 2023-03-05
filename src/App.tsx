import React from 'react';
import Register from "./pages/Register";
import Login from "./pages/Login";
import {createBrowserRouter, RouterProvider} from "react-router-dom";

function App() {
  const routes = createBrowserRouter([
    {
      path: '/login',
      element: <Login/>,
    },
    {
      path: '/register',
      element: <Register/>,
    }
  ]);
  return <RouterProvider router={routes}/>;
}

export default App;
