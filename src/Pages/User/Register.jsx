import React, { useEffect } from 'react'
import loginIMG from '../../assets/login.jpg';
import { useNavigate,Link } from 'react-router-dom'
import { useState } from 'react';
import { userRegister ,userRegisterWithGoogle} from '../../services/userApi';
import { toast } from 'react-toastify'
import { GoogleLogin } from '@react-oauth/google';
import {useGoogleLogin } from '@react-oauth/google';
import axios from "axios";

function Register() {
  const [user, setUser] = useState(null);
  
  const [values, setValues] = useState({
    username: "",
    email: "",
    password:""
  })
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log('Login Failed:', error)
  });
  
  useEffect(
    () => {
        if (user) {
            axios
                .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                    headers: {
                        Authorization: `Bearer ${user.access_token}`,
                        Accept: 'application/json'
                    }
                })
              .then((res) => {
                console.log(res.data);
                userRegisterWithGoogle(res.data).then((res) => {
                  if (res.data.created) {
                    localStorage.setItem("userJWT", res.data.token);
                    toast.success("registered successfully");
                    navigate("/");
                  } else if (res.data.exists) {
                    toast.warn("account already exists");
                  }
                  })
                })
                .catch((err) => console.log(err));
        }
    },
    [ user ]
);

// log out function to log the user out of google and set the profile array to null
// const logOut = () => {
//     googleLogout();
//     setProfile(null);
// };

  const handleSubmit = (e) => {
    e.preventDefault()
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
            localStorage.setItem("userJWT", res.data.token);   
            toast.success(res.data.message);
            navigate("/");
          } else if (res.data.exists) {
            return toast.warn("Account already exists");
        }
      })
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 h-screen w-full'>
    <div className='hidden sm:block'>
    <img className='w-full h-full object-cover' src={loginIMG} alt="" />
    </div>
    <div className='flex flex-col justify-center'>
      <form onSubmit={handleSubmit} className='max-w-[400px] w-full mx-auto bg-gray-500 p-8 px-8 rounded-lg' >
          <h2 className='text-4xl text-white font-bold text-center'>Sign In</h2>
          <div className='flex flex-col text-white py-2 '> 
            <input onChange={(e) => { setValues({...values, [e.target.name]:e.target.value }) }} className='rounded-lg bg-gray-300 mt-2 p-2 focus:border-black focus:bg-gray-800 focus:outline-none'  type="text" placeholder='Username' name='username'/>
          </div>
          <div className='flex flex-col text-white py-2 '>
            <input onChange={(e) => { setValues({...values, [e.target.name]:e.target.value }) }} className='rounded-lg bg-gray-300 mt-2 p-2 focus:border-black focus:bg-gray-800 focus:outline-none' type="email" placeholder='Email' name='email' />
          </div>
          <div className='flex flex-col text-white py-2 '>
            <input onChange={(e) => { setValues({...values, [e.target.name]:e.target.value }) }} className='rounded-lg bg-gray-300 mt-2 p-2 focus:border-black focus:bg-gray-800 focus:outline-none' type="password" placeholder='Password' name='password'/>
          </div>
          <button className='w-full my-5 py-2 bg-blue-900 rounded-lg shadow-lg shadow-slate-700/10 hover:shadow-slate-700/10 text-white font-semibold'>Sign In</button>
          <div>
            <h2>React Google Login</h2>
            <br />
            <br />
            <GoogleLogin />
          </div>
          <button type='button' onClick={() => {
            login()
          }}>GOOGLE</button>
          <div>
            <span>Already have an account? </span>
            <Link to="/login">
              Log IN
            </Link>
          </div>
        </form>
      </div>
      </div>
  )
}

export default Register