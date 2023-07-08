import React from 'react'
import { Route, Routes } from "react-router-dom";
import NotFoundPage from '../Pages/NotFoundPage';
import AdminLogin from '../Pages/Admin/AdminLogin';
import AdminHome from '../Pages/Admin/AdminHome';

function AdminRoutes() {
  return (
    <Routes>
          <Route path='*' element={<NotFoundPage />} />
          <Route exact path='/login' element={<AdminLogin />} />
          <Route exact path='/home' element={<AdminHome/>}/>
    </Routes>
  )
}

export default AdminRoutes