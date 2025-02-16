import React, {useEffect} from "react"
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import Home from "./pages/HomePage"
import Login from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound"
import { connect } from 'react-redux';
import {encryptAndStoreToken, decryptAndRetrieveToken, isTokenValid} from "./Encryption/encrypt"

const  App = (props) => {

  const navigate = useNavigate();
  const response = props.AllLogins;
  
  // Clear token and redirect to login
  const logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("tokenExpiry");
    navigate("/login");
  };

  useEffect(() => {
    if (response?.status == "200") {
      console.log("Token:", response.data.token); // 
      encryptAndStoreToken(response?.data?.token);
      navigate("/dashboard");
    } else {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("tokenExpiry");
    }
  }, [response]);

  return (
    <div className="font-roboto">
      <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route
          path="/dashboard"
          element={
            decryptAndRetrieveToken() && isTokenValid() ? (
              <Dashboard />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    AllLogins: state.allLogins,
  };
};

export default connect(mapStateToProps)(App);
