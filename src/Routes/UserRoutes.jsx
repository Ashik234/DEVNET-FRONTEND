import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../Pages/User/Login";
import Register from "../Pages/User/Register";
import Home from "../Pages/User/Home";
import EmailVerify from "../components/EmailVerify/EmailVerify";
import NotFoundPage from "../Pages/NotFoundPage";
import Layout from "../Pages/User/Layout";
import Questions from "../Pages/User/Questions";
import Profile from "../components/Profile/Profile";
import ProfileSaved from "../components/Profile/ProfileSaved";
import EditProfile from "../components/Profile/EditProfile"
import PrivateRoutes from "../protectedRoutes/PrivateRoutes";
import PublicRoutes from "../protectedRoutes/PublicRoutes";
import AskQuestion from "../components/Questions/AskQuestion";
import Communities from "../Pages/User/Communities";
import ViewQuestion from "../components/Questions/ViewQuestion";
import CreateCommunity from "../components/Communities/CreateCommunity";
import ViewCommunity from "../components/Communities/ViewCommunity";
import CommunityMembers from "../components/Communities/CommunityMembers";
import CommunityEvents from "../components/Communities/CommunityEvents"
import CommunityDiscussions from "../components/Communities/CommunityDiscussions"
import CommunityCreateEvent from "../components/Communities/CommunityCreateEvent";
import ViewEvent from "../components/Communities/ViewEvent";
import Compiler from "../components/Compiler/Compiler";
import Events from "../Pages/User/Events";
import IndividualChat from "../Pages/User/IndividualChat";

function UserRoutes() {
  return (
    <Routes>
      <Route path="*" element={<NotFoundPage />} />

      <Route exact path="/login" element={<PublicRoutes><Login /></PublicRoutes>} />
      <Route exact path="/register" element={<PublicRoutes><Register /></PublicRoutes>} />
      <Route exact path="/:id/verify/:token" element={<EmailVerify />} />
      <Route element={<PrivateRoutes role={"user"} route={"/login"} />}>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />}></Route>
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/profile/edit" element={<EditProfile/>}/>
        <Route exact path="/profile/saved" element={<ProfileSaved/>}/>
        <Route exact path="/questions" element={<Questions />} />
        <Route exact path="/questions/ask" element={<AskQuestion />} />
        <Route exact path="/questions/viewquestion" element={<ViewQuestion/>}/>
        <Route exact path="/communities" element={<Communities/>} />
        <Route exact path="/communities/createcommunity" element={<CreateCommunity/>}/>
        <Route exact path="/communities/viewcommunity" element={<ViewCommunity/>}/>
        <Route exact path="/communities/viewcommunity/members" element={<CommunityMembers/>}/>
        <Route exact path="/communitites/viewcommunity/members/individual" element={<IndividualChat/>}/>
        <Route exact path="/communities/viewcommunity/events" element={<CommunityEvents/>}/>
        <Route exact path="/communities/viewcommunity/create" element={<CommunityCreateEvent/>}/>
        <Route exact path="/communities/viewcommunity/discussions" element={<CommunityDiscussions/>}/>
        <Route exact path="/communities/viewcommunity/viewevent" element={<ViewEvent/>}/>
        <Route exact path="/compiler" element={<Compiler/>}/>
        <Route exact path="/events" element={<Events/>}/>
      </Route>
      </Route>
    </Routes>
  );
}

export default UserRoutes;
