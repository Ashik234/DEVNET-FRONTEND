import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../Pages/User/Login";
import Register from "../Pages/User/Register";
import Home from "../Pages/User/Home";
import EmailVerify from "../components/EmailVerify/EmailVerify";
import NotFoundPage from "../Pages/NotFoundPage";
import Layout from "../Pages/User/Layout";
import Questions from "../components/Questions/Questions";
import Profile from "../components/Profile/Profile";
import PrivateRoutes from "../protectedRoutes/PrivateRoutes";
import PublicRoutes from "../protectedRoutes/PublicRoutes";
import AskQuestion from "../components/Questions/AskQuestion";
import Communities from "../components/Communities/Communities";
import ViewQuestion from "../components/Questions/ViewQuestion";
import CreateCommunity from "../components/Communities/CreateCommunity";
import ViewCommunity from "../components/Communities/ViewCommunity";

function UserRoutes() {
  return (
    <Routes>
      <Route path="*" element={<NotFoundPage />} />

      <Route exact path="/login" element={<PublicRoutes><Login /></PublicRoutes>} />
      <Route exact path="/register" element={<Register />} />
      <Route exact path="/:id/verify/:token" element={<EmailVerify />} />
      <Route element={<PrivateRoutes role={"user"} route={"/login"} />}>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />}></Route>
        <Route exact path="/questions" element={<Questions />} />
        <Route exact path="/questions/ask" element={<AskQuestion />} />
        <Route exact path="/questions/viewquestion" element={<ViewQuestion/>}/>
        <Route exact path="/communities" element={<Communities/>} />
        <Route exact path="/communities/createcommunity" element={<CreateCommunity/>}/>
        <Route exact path="/communities/viewcommunity" element={<ViewCommunity/>}/>
        <Route exact path="/profile" element={<Profile />} />
      </Route>
      </Route>
    </Routes>
  );
}

export default UserRoutes;
