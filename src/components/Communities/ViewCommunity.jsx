import React, { useState, useEffect } from "react";
import COMMUNITY from "../../assets/community.jpg";
import { useLocation } from "react-router-dom";
import { getSingleCommunity, joinCommunity } from "../../services/userApi";
import { toast } from "react-toastify";
import CommunityMembers from "./CommunityMembers";
import CommunityEvents from "./CommunityEvents";
import CommunityDiscussions from "./CommunityDiscussions";
import { useSelector } from "react-redux/es/hooks/useSelector";

function ViewCommunity() {
  const location = useLocation();
  const id = location.state;

  const [community, setCommunity] = useState(null);
  const [activeSection, setActiveSection] = useState("about");
  const profiledata = useSelector((state) => state.user);
  console.log(profiledata);

  useEffect(() => {
    getSingleCommunity(id).then((res) => {
      console.log(res.data.singlecommunity);
      setCommunity(res.data.singlecommunity);
    });
  }, []);

  const handleJoin = (id) => {
    joinCommunity(id).then((res) => {
      toast.success(res.data.message);
    });
  };

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };
  const isCurrentUserMember = () => {
    if (!community || !community.members) {
      return false;
    }
    const currentUserID = profiledata.userId;

    for (const memberData of community.members) {
      const memberID = memberData.member._id;
      console.log(memberID);
      if (memberID === currentUserID) {
        return true;
      }
    }
    return false;
  };

  const currentUserMember = isCurrentUserMember();

  return (
    <>
      {community ? (
        <div>
          <div className="relative">
            <img
              src={COMMUNITY}
              alt="Community Image"
              className="w-full h-72 object-cover"
            />
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
              <h2 className="text-2xl font-bold">
                Building Bridges, Embracing Unity: Our Community, Our Strength.
              </h2>
            </div>
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-3 absolute top-52 left-0 right-0 z-10">
              <div className="flex flex-col sm:flex-row items-center justify-between">
                <div className="flex items-center">
                  <div className="w-28 h-28 overflow-hidden">
                    <img
                      src={community.image}
                      alt="Community Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-bold">{community.title}</h3>
                    <p className="text-gray-600">
                      Members: {community.numberOfMembers}
                    </p>
                    <p className="text-gray-600">
                      Created At: {community.createdAt}
                    </p>
                  </div>
                </div>
                {!currentUserMember && (
                  <button
                    onClick={() => handleJoin(community._id)}
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
                  >
                    Join
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="bottom-4 sm:bottom-0 left-0 right-0 mt-20 z-20">
            <nav className="bg-slate-100">
              <div className="max-w-3xl mx-auto px-8 py-2">
                <ul className="flex space-x-36">
                  <li>
                    <button onClick={() => handleSectionChange("about")}>
                      <h1>About Us</h1>
                    </button>
                  </li>
                  <li>
                    <button onClick={() => handleSectionChange("members")}>
                      <h1>Members</h1>
                    </button>
                  </li>
                  <li>
                    <button onClick={() => handleSectionChange("events")}>
                      <h1>Events</h1>
                    </button>
                  </li>
                  <li>
                    <button onClick={() => handleSectionChange("discussions")}>
                      <h1>Discussions</h1>
                    </button>
                  </li>
                </ul>
              </div>
            </nav>
          </div>

          {activeSection === "about" && (
            <div className="bottom-0 left-0 right-0 mt-8 z-20">
              <div className="max-w-5xl mx-auto p-8 bg-slate-100 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4">
                  About {community?.title}
                </h2>
                <p className="text-gray-600">{community?.description}</p>
              </div>
            </div>
          )}
          {activeSection === "members" && <CommunityMembers />}
          {activeSection === "events" && <CommunityEvents id={community._id} />}
          {activeSection === "discussions" && (
            <CommunityDiscussions id={community._id} />
          )}
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
}

export default ViewCommunity;
