import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { adminLogin } from "../../services/adminApi";

function AdminLogin() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      adminLogin({ ...values }).then((res) => {
        if (res.data.login) {
          localStorage.setItem("adminJWT", res.data.token);
          toast.success(res.data.message);
          navigate("/admin");
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="bg-white ">
      <div className="flex justify-center items-center h-screen  ">
        <div className="bg-white p-8  rounded-md  md:w-3/4 lg:w-2/6 shadow-xl  ">
          <h1 className="text-4xl text-blue-950 font-bold mb-10 text-center">
            Admin Login
          </h1>
          <h3 className="font-bold text-xl  mb-4">
            
          </h3>

          <form onClick={handleSubmit}>
            <div className="mb-">
              <label className="block text-gray-700 text-md font-bold mb-2">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="w-full border border-gray-300 shadow-md px-3 py-2 rounded-md mb-3 "
                placeholder="Enter your email"
                onChange={(e) =>
                  setValues({ ...values, [e.target.name]: e.target.value })
                }
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-md font-bold mb-2 ">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                className="w-full border border-gray-300 px-3 py-2 rounded-md shadow-md mb-3 "
                placeholder="Enter your password"
                onChange={(e) =>
                  setValues({ ...values, [e.target.name]: e.target.value })
                }
              />
            </div>
            <div className="w-full mb-3">
              <div className="w-full">
                <button
                  type="submit"
                  className=" w-full bg-blue-950 hover:bg-blue-800 text-white font-bold py-2 px-4  text-xl mb-1"
                >
                  LOGIN
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
