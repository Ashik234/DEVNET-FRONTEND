import React from 'react'
import { Route, Routes } from "react-router-dom";
import Login from '../Pages/User/Login'
import Register from '../Pages/User/Register';
import Home from '../Pages/User/Home'
function UserRoutes() {
  return (
    <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
     </Routes>
  )
}

export default UserRoutes