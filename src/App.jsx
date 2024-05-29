import React from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root.jsx";
import ErrorPage from "./error-page.jsx";
import './App.css';
import Login from './auth/login';
import UserTable from './components/userTable.jsx';
import Blog from './components/blog.jsx';

const router = createBrowserRouter([
  {
    path: "/blog",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Blog />,
      },
      {
        path: "userTable",
        element: <UserTable />,
      },
    ]
  },
  {
    path: "/",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
]);

const App = () => {
  return (
    <RouterProvider router={router} />
  );
};

export default App;
