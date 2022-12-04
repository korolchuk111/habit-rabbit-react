import React from "react";
import {
  Routes,
  Route, Navigate
} from "react-router-dom";
// import { createBrowserHistory } from "history";
import PrivateRoute from "./privateRoute";
// routes
// import Router from './routes';
// theme
import ThemeProvider from "./theme";
// components
import ScrollToTop from "./components/ScrollToTop";
import { BaseOptionChartStyle } from "./components/chart/BaseOptionChart";
import DashboardLayout from "./layouts/dashboard";
import Login from "./projectComponents/authentication/login";
import Register from "./projectComponents/authentication/register";
import Products from "./pages/Products";
import User from "./pages/Habits";
import Blog from "./pages/Blog";
import NotFound from "./pages/Page404";
import DashboardApp from "./pages/DashboardApp";

// ----------------------------------------------------------------------

export default function App() {
  return (
    <ThemeProvider>
      <ScrollToTop />
      <BaseOptionChartStyle />
      <Routes>
        <Route
          exact
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardLayout />
            </PrivateRoute>
          }
        >
          <Route
            exact
            path="/dashboard/app"
            element={
              <PrivateRoute>
                <DashboardApp />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/dashboard/habits"
            element={
              <PrivateRoute>
                <User />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/dashboard/products"
            element={
              <PrivateRoute>
                <Products />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/dashboard/blog"
            element={
              <PrivateRoute>
                <Blog />
              </PrivateRoute>
            }
          />
        </Route>
        <Route
          exact
          path="/login"
          element={
            <Login />
          }
        />
        <Route
          exact
          path="/register"
          element={
            <Register />
          }
        />
        <Route path="404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" />} />
        <Route
          exact
          path="/"
          element={
            <Navigate to={"/dashboard/app"}/>
          }
          />
        <Route path="/" element={<Login />} />
      </Routes>
    </ThemeProvider>
  );
}
