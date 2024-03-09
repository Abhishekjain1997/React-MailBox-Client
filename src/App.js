import React from "react";
import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import AuthForm from "./component/Authentication/AuthForm";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import Header from "./component/Layout/Header";
import ForgotPassword from "./component/Authentication/ForgotPassword";
import Inbox from "./component/pages/Inbox";
import { authActions } from "./store/auth-slice";
import SentMail from "./component/pages/SentMail";

function App() {
  const { isAuthenticated, token, email } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  console.log(email);
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedEmail = localStorage.getItem("email");
    if (savedToken && savedEmail) {
      dispatch(authActions.login({ token: savedToken, email: savedEmail }));
    }
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem("token", token);
      localStorage.setItem("email", email);
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("email");
    }
  }, [token, email, isAuthenticated]);

  return (
    <Routes>
      <Route
        path="/"
        element={!isAuthenticated ? <AuthForm /> : <Navigate to="/welcome" />}
      />
      <Route
        path="welcome/*"
        element={isAuthenticated ? <Header /> : <Navigate to="/" />}
      >
        <Route path="inbox" element={<Inbox />} />
        <Route path="sent" element={<SentMail />} />
      </Route>
      <Route path="/forgot" element={<ForgotPassword />} />
    </Routes>
  );
}

export default App;  