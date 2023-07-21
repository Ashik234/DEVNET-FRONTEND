import React from 'react'
import { Route, Routes } from "react-router-dom";
import NotFoundPage from '../Pages/NotFoundPage';
import AdminLogin from '../Pages/Admin/AdminLogin';
import AdminHome from '../Pages/Admin/AdminHome';
import PrivateRoutes from '../protectedRoutes/PrivateRoutes';
import Layout from "../components/Admin/Layout"
import DashBoard from "../components/Admin/DashBoard"
import AdminPublicRoutes from "../protectedRoutes/AdminPublicRoutes"
function AdminRoutes() {
  return (
    <Routes>
          <Route path='*' element={<NotFoundPage />} />
          <Route exact path='/login' element={<AdminLogin />} />
          <Route exact path='/home' element={<AdminHome/>}/>
          <Route element={<PrivateRoutes role={"admin"} route={"/admin/login"}/>}/>
          <Route path='/' element={<Layout/>}>
            <Route index element={<DashBoard/>}/>
          </Route>
    </Routes>
  )
}

export default AdminRoutes