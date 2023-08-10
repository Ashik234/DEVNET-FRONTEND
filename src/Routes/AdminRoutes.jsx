import React from 'react'
import { Route, Routes } from "react-router-dom";
import NotFoundPage from '../Pages/NotFoundPage';
import AdminLogin from '../Pages/Admin/AdminLogin';
import AdminHome from '../Pages/Admin/AdminHome';
import PrivateRoutes from '../protectedRoutes/PrivateRoutes';
import AdminPublicRoutes from "../protectedRoutes/AdminPublicRoutes"
import Layout from '../Pages/Admin/Layout';
import DashBoard from "../components/Admin/DashBoard"
import Users from "../components/Admin/Users"
import Events from '../components/Admin/Events';
import Community from '../components/Admin/Community';
import Notifications from '../components/Admin/Notifications';
import AdminProfile from '../components/Admin/AdminProfile';
import Reports from '../components/Admin/Reports';
import Articles from '../components/Admin/Articles';
import AddArticle from '../components/Admin/AddArticle';
import EditArticle from '../components/Admin/EditArticle';

function AdminRoutes() {
  return (
    <Routes>
          <Route path='*' element={<NotFoundPage />} />

          <Route exact path='/login' element={<AdminPublicRoutes><AdminLogin /></AdminPublicRoutes>} />
          <Route exact path='/home' element={<AdminPublicRoutes><AdminHome/></AdminPublicRoutes>}/>
          <Route element={<PrivateRoutes role={"admin"} route={"/admin/login"}/>}>
          <Route path='/' element={<Layout/>}>
            <Route index element={<DashBoard/>}/>
            <Route exact path='/users' element={<Users/>}/>
            <Route exact path='/events' element={<Events/>}/>
            <Route exact path='/communities' element={<Community/>}/>
            <Route exact path="/notifications" element={<Notifications/>}/>
            <Route exact path='/articles' element={<Articles/>}/>
            <Route exact path='/articles/add' element={<AddArticle/>}/>
            <Route exact path='/articles/edit' element={<EditArticle/>}/>
            <Route exact path='/reports' element={<Reports/>}/>
            <Route exact path='/adminprofile' element={<AdminProfile/>}/>
          </Route>
          </Route>
    </Routes>
  )
}

export default AdminRoutes