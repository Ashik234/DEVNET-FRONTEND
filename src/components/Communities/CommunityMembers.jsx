import React, { useState, useEffect } from "react";
import { getSingleCommunity } from "../../services/userApi";
import { useLocation } from "react-router-dom";

function CommunityMembers() {
  const location = useLocation();
  const id = location.state;

  const [community, setCommunity] = useState(null);

  useEffect(() => {
    getSingleCommunity(id).then((res) => {
      console.log(res.data);
      setCommunity(res.data.singlecommunity);
    });
  }, []);

  if (!community) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bottom-0 left-0 right-0 mt-8 mb-8 z-20">
      <div className="bg-slate-100 max-w-5xl mx-auto p-8 rounded-lg shadow-lg">
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th  className="py-2  font-bold">No</th>
              <th className="py-2  font-bold">Name</th>
              <th className="py-2  font-bold">Role</th>
              <th className="py-2  font-bold">Profile</th>
              <th className="py-2  font-bold">Message</th>
            </tr>
          </thead>
          <tbody>
            {community.members.map((member, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                <td className="py-2 text-center">{index + 1}</td>
                <td className="py-2 text-center">{member.member.username}</td>
                <td className="py-2 text-center">{member.role}</td>
                <td className="py-2 text-center">
                  <a
                    href={member.profileLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500"
                  >
                    Profile Link
                  </a>
                </td>
                <td className="py-2">{member.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CommunityMembers;
