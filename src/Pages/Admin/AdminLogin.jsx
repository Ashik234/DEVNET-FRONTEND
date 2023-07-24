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
    <div
      className="min-h-screen flex justify-center items-center"
      style={{
        background: `url('https://www.pexels.com/photo/woman-wearing-black-hoodie-jacket-holding-grey-laptop-computer-1181325/')`,
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-4xl font-bold mb-10 text-center">
          Admin Login
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-md font-bold mb-2">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="w-full border hover:border-gray-700 shadow-md px-3 py-2 rounded-lg focus:outline-none focus:border-blue-800"
              placeholder="Enter your email"
              onChange={(e) =>
                setValues({ ...values, [e.target.name]: e.target.value })
              }
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-md font-bold mb-2">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className="w-full border hover:border-gray-700 px-3 py-2 rounded-lg shadow-md focus:outline-none focus:border-blue-800"
              placeholder="Enter your password"
              onChange={(e) =>
                setValues({ ...values, [e.target.name]: e.target.value })
              }
            />
          </div>
          <div className="w-full">
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 text-xl mb-1 rounded-lg focus:outline-none"
            >
              LOGIN
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
