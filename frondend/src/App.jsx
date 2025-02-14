import React, {useEffect} from "react"
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import Home from "./pages/HomePage"
import Login from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound"
import { connect } from 'react-redux';

const  App = (props) => {

  const navigate = useNavigate();

  const response = props.AllLogins;

  useEffect(() => {
    if(response?.status == "200"){
      sessionStorage.setItem("token", response?.data?.token);
      navigate("/dashboard");
    }else{
      sessionStorage.removeItem("token");
    }
  }, [props.AllLogins]);

  return (
    <div className="font-roboto">
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/login" element={<Login />}/>
        <Route path="/home" element={<Home/>}/>
        <Route
            path="/dashboard"
            element={ sessionStorage.getItem("token") != null ? <Dashboard /> : <Navigate to="/login" replace />}
          />
        <Route path="/*" element={<NotFound/>}/>
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
