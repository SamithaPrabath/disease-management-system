import React, { useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import Home from "./pages/PublicPage";
import Login from "./pages/LoginPage";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";

import DashboardEpi from "./pages/epidemiology/Dashboard";
import DashboardPhi from "./pages/phi/Dashboard";
import DashboardDoc from "./pages/doctor/Dashboard";
import DashboardIdu from "./pages/idu/Dashboard";
import DashboardMoh from "./pages/moh/Dashboard";
import DashboardAdmin from "./pages/admin/Dashboard";

import NotFound from "./pages/NotFound";
import { connect } from "react-redux";
import {
  encryptAndStoreToken,
  decryptAndRetrieveToken,
  isTokenValid,
} from "./Encryption/encrypt";

const App = (props) => {
  const navigate = useNavigate();
  const response = props.AllLogins;

  useEffect(() => {
    if (response?.status == "200") {
      encryptAndStoreToken(response?.data?.token);

      if (response?.data?.isInitial == 1) {
        navigate("/reset-password");
      } else {
        navigate("/dashboard");
      }
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
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/home" element={<Home />} />
        <Route
          path="/dashboard"
          element={
            decryptAndRetrieveToken() && isTokenValid() ? (
              response?.data?.role === "admin" ? (
                <DashboardAdmin />
              ) : response?.data?.role === "epi" ? (
                <DashboardEpi />
              ) : response?.data?.role === "phi" ? (
                <DashboardPhi />
              ) : response?.data?.role === "doctor" ? (
                <DashboardDoc />
              ) : response?.data?.role === "idu" ? (
                <DashboardIdu />
              ) : response?.data?.role === "moh" ? (
                <DashboardMoh />
              ) : (
                <Navigate to="/login" replace />
              )
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    AllLogins: state.allLogins,
  };
};

export default connect(mapStateToProps)(App);
