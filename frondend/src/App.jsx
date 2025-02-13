import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage"
import Login from "./pages/LoginPage";
import NotFound from "./pages/NotFound"

function App() {

  return (
    <div className="font-roboto">
      <Router>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/" element={<Home/>}/>
        <Route path="/*" element={<NotFound/>}/>
      </Routes>
    </Router>
    </div>
  )
}

export default App
