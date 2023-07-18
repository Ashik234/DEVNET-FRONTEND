import React, { useState, useEffect } from "react";
import success from "../../assets/success.png";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { changeUserDetails } from "../../Redux/user/UserSlice";
import { useDispatch } from "react-redux";

export default function EmailVerify() {
  const [validUrl, setValidUrl] = useState(false);
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const verifyEmailUrl = async () => {
      try {
        const url = `http://localhost:8000/${params.id}/verify/${params.token}`;
        const { data } = await axios.get(url);
        console.log(data);
        dispatch(
          changeUserDetails({
            userId: data.user._id,
            username: data.user.username,
            email: data.user.email,
            joinedDate: data.user.joinedDate,
          })
        );
        localStorage.setItem("userJWT", data.token1);
        setValidUrl(true);
      } catch (error) {
        console.log(error);
        setValidUrl(false);
      }
    };
    verifyEmailUrl();
  }, [params]);
  return (
    <>
      {validUrl ? (
        <div className="flex justify-center items-center flex-col h-screen">
          <img src={success} alt="success_img" className="w-32 h-32 mb-4" />
          <h1 className="text-2xl font-bold">Email Verified Successfully</h1>
          <Link to="/">
            <button className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-md">
              HOME
            </button>
          </Link>
        </div>
      ) : (
        <main class="h-screen w-full flex flex-col justify-center items-center bg-[#1A2238]">
          <h1 class="text-9xl font-extrabold text-white tracking-widest">
            404
          </h1>
          <div class="bg-[#FF6A3D] px-2 text-sm rounded rotate-12 absolute">
            Page Not Found
          </div>
          <button class="mt-5">
            <a class="relative inline-block text-sm font-medium text-[#FF6A3D] group active:text-orange-500 focus:outline-none focus:ring">
              <span class="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-[#FF6A3D] group-hover:translate-y-0 group-hover:translate-x-0"></span>

              <span class="relative block px-8 py-3 bg-[#1A2238] border border-current">
                <Link to="/register">Go Home</Link>
              </span>
            </a>
          </button>
        </main>
      )}
    </>
  );
}
