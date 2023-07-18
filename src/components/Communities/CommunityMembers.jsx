import React from 'react'

function CommunityMembers() {
  return (
    <div className="bottom-0 left-0 right-0 mt-8 mb-8 z-20">
              <div className="bg-slate-100 max-w-5xl mx-auto p-8 rounded-lg shadow-lg">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="py-2">Name</th>
                      <th className="py-2">Role</th>
                      <th className="py-2">Profile</th>
                      <th className="py-2">Message</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-2">John Doe</td>
                      <td className="py-2">Developer</td>
                      <td className="py-2">Profile Link</td>
                      <td className="py-2">Hello, nice to meet you!</td>
                    </tr>
                  </tbody>
                </table>
            </div>
          </div>
  )
}

export default CommunityMembers