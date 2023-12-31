import React, { useState, useEffect } from "react";
import { getSingleCommunity, createChat } from "../../services/userApi";
import { useLocation, useNavigate } from "react-router-dom";
import { BsChatRightDotsFill } from "react-icons/bs";
import { useSelector } from "react-redux/es/hooks/useSelector";
import Loader from "../../Pages/Loader";

function CommunityMembers() {
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.state;
  const profiledata = useSelector((state) => state.user);
  
  const [community, setCommunity] = useState(null);

  useEffect(() => {
    getSingleCommunity(id).then((res) => {
        setCommunity(res.data.singlecommunity);
    });
  }, []);


  const navigateToProfile = (id) => {
    navigate("/community/viewcommunity/members/profile", { state: { id } });
  };

  const navigateToCreate = (senderId, receiverId) => {
    createChat({ senderId: senderId, receiverId: receiverId })
      .then((res) => {
        let data = res.data.chatData;
        if (data.exists) {
        } else {
          navigate("/communitites/viewcommunity/members/individual", {
            state: { data },
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (!community) {
    return (
      <Loader/>
    );
  }

  return (
    <div className="bottom-0 left-0 right-0 mt-8 mb-8 z-20">
      <div className="bg-slate-100 max-w-5xl mx-auto p-8 rounded-lg shadow-lg">
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="py-2  font-bold">No</th>
              <th className="py-2  font-bold">Name</th>
              <th className="py-2  font-bold">Role</th>
              <th className="py-2  font-bold">Profile</th>
              <th className="py-2  font-bold">Message</th>
            </tr>
          </thead>
          <tbody>
            {community.members.map((member, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
              >
                <td className="py-2 text-center">{index + 1}</td>
                <td className="py-2 text-center">{member.member.username}</td>
                <td className="py-2 text-center">{member.role}</td>
                <td className="py-2 text-center">
                  <button
                    onClick={() => navigateToProfile(member.member._id)}
                    href=""
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500"
                  >
                    Profile
                  </button>
                </td>
                <td className="py-2">
                  <div className="flex justify-center items-center">
                    {profiledata.userId !== member.member._id && (
                      <button
                        onClick={() =>
                          navigateToCreate(
                            profiledata.userId,
                            member.member._id
                          )
                        }
                      >
                        <BsChatRightDotsFill />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CommunityMembers;
