import React from 'react'
import { Route, Routes } from "react-router-dom";
import Login from '../Pages/User/Login'
import Register from '../Pages/User/Register';
import Home from '../Pages/User/Home'
import EmailVerify from '../components/EmailVerify/EmailVerify';
import NotFoundPage from '../Pages/NotFoundPage';
import Layout from '../Pages/User/Layout';
import Questions from '../components/Questions/Questions';
import Profile from '../components/Profile/Profile';

function UserRoutes() {
  return (
    <Routes>
      <Route path='*' element={<NotFoundPage />} />
      
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/register" element={<Register />} />
      <Route exact path="/:id/verify/:token" element={<EmailVerify/>}/>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />}></Route>
        <Route exact path='/questions' element={<Questions/>}/>
        <Route exact path='/profile' element={<Profile/>}/>
      </Route>
    </Routes>
  )
}

export default UserRoutes