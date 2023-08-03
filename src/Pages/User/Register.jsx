import React, { useState, useEffect } from "react";
import loginIMG from "../../assets/login.jpg";
import { useNavigate, Link } from "react-router-dom";
import { userRegister, userRegisterWithGoogle } from "../../services/userApi";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useDispatch } from "react-redux";
import { changeUserDetails } from "../../Redux/user/UserSlice";

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [user, setUser] = useState(null);
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
  });

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          userRegisterWithGoogle(res.data).then((res) => {
            console.log(res.data);
            const data = res.data
            if (res.data.created) {
              dispatch(
                changeUserDetails({
                  userId: data.user._id,
                  username: data.user.username,
                  email: data.user.email,
                })
              );
              localStorage.setItem("userJWT", res.data.token);
              toast.success("Registered successfully");
              navigate("/");
            } else if (res.data.exists) {
              toast.warn("Account already exists");
            }
          });
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (values.username.trim() == "") {
      return toast.warn("username should not be empty");
    } else if (values.email.trim() == "") {
      return toast.warn("email should not be empty");
    } else if (values.password.trim() == "") {
      return toast.warn("password should not be empty");
    } else {
      try {
        userRegister({ ...values }).then((res) => {
          if (res.data.created) {
            toast.success(res.data.message);
          } else if (res.data.exists) {
            return toast.warn("Account already exists");
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
      <div className="hidden sm:block">
        <img className="w-full h-full object-cover" src={loginIMG} alt="" />
      </div>
      <div className="flex flex-col justify-center">
        <form
          onSubmit={handleSubmit}
          className="max-w-[400px] w-full mx-auto p-8 px-8 rounded-lg"
        >
          <h2 className="text-4xl text-black font-bold text-center">SIGN IN</h2>
          <div className="flex flex-col text-white py-2 ">
            <input
              onChange={(e) => {
                setValues({ ...values, [e.target.name]: e.target.value });
              }}
              className="rounded-lg bg-gray-300 mt-2 p-2 "
              type="text"
              placeholder="Username"
              name="username"
            />
          </div>
          <div className="flex flex-col text-white py-2 ">
            <input
              onChange={(e) => {
                setValues({ ...values, [e.target.name]: e.target.value });
              }}
              className="rounded-lg bg-gray-300 mt-2 p-2 "
              type="email"
              placeholder="Email"
              name="email"
            />
          </div>
          <div className="flex flex-col text-white py-2 ">
            <input
              onChange={(e) => {
                setValues({ ...values, [e.target.name]: e.target.value });
              }}
              className="rounded-lg bg-gray-300 mt-2 p-2 "
              type="password"
              placeholder="Password"
              name="password"
            />
          </div>
          <div className="flex justify-center">
            <button className="mx-auto my-5 py-2 px-4 w-48 bg-blue-900 rounded-lg  text-white font-semibold">
              SIGN IN
            </button>
          </div>
          <div className="flex justify-center">
            <button
              className="mx-auto my-5 py-2 px-4 w-48 bg-gray-400 rounded-lg text-white font-semibold shadow-lg transform transition hover:scale-105 focus:outline-none"
              type="button"
              onClick={() => {
                login();
              }}
            >
              <FcGoogle className="inline-block w-6 h-6 mr-2" />
              <span className="font-normal align-middle">Google Sign in</span>
            </button>
          </div>
          <div className="flex justify-center">
            <span className="font-light">Already have an account?</span>
            <Link to="/login">Log In</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
