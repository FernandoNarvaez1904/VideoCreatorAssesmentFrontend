import React from "react";
import Register from "./pages/Register";
import Login from "./pages/Login";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Videos from "./pages/Videos";
import { MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "react-query";
import ProtectedRoute from "./components/ProtectedRoute";
import { Notifications } from "@mantine/notifications";
import { RecoilRoot } from "recoil";

const queryClient = new QueryClient();

function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Navigate to={"/videos"} />,
    },
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
      element: (
        <ProtectedRoute>
          <Videos />
        </ProtectedRoute>
      ),
    },
  ]);
  return <RouterProvider router={routes} />;
}

function WrappedApp() {
  return (
    <MantineProvider withNormalizeCSS withGlobalStyles>
      <QueryClientProvider client={queryClient}>
        <Notifications position={"top-right"} />
        <RecoilRoot>
          <App />
        </RecoilRoot>
      </QueryClientProvider>
    </MantineProvider>
  );
}

export default WrappedApp;
