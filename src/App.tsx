import React from "react";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Videos from "./pages/Videos";
import { MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App() {
  const routes = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/videos",
      element: <Videos />,
    },
  ]);
  return <RouterProvider router={routes} />;
}

function WrappedApp() {
  return (
    <MantineProvider withNormalizeCSS withGlobalStyles>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </MantineProvider>
  );
}

export default WrappedApp;
