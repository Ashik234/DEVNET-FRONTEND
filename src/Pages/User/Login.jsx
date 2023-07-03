import React,{useState,useEffect} from 'react'
import loginIMG from '../../assets/login.jpg';
import { useNavigate,Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { userLogin,userLoginwithGoogle } from '../../services/userApi';
import {useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

function Login() {
  const [user, setUser] = useState(null);

  const [values, setValues] = useState({
    email: "",
    password: ""
  })
  const navigate = useNavigate();

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
          userLoginwithGoogle(res.data)
            .then((res) => {
              if (res.data.status) {
                localStorage.setItem("userJWT", res.data.token);
                navigate("/");
                toast.success(res.data.message);
              } else if (res.data.exists) {
                toast.warn("account already exists");
              }
            })
            .catch((error) => {
              console.log(error.message);
              toast.error(error.response.data.message);
            });
        })
        .catch((err) => console.log(err));
    }
  }, [user]);
  

  const handleSubmit = (e) => {
    e.preventDefault()
    // if (values.email.trim() == "") {
    //   return toast.warn("email should not be empty");
    // } else if (values.password.trim() == "") {
    //   return toast.warn("password should not be empty");
    // } else { 
      try {
        userLogin({ ...values }).then((res) => {
          console.log(res);
          if (res.data.status) {
            localStorage.setItem("userJWT", res.data.token);   
            toast.success(res.data.message);
            navigate("/");
          } else {
            return toast.warn(" already Accountists");
          }
        })
      } catch (error) {
        console.log(error);
      }
    // }
  }

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 h-screen w-full'>
    <div className='hidden sm:block'>
    <img className='w-full h-full object-cover' src={loginIMG} alt="" />
    </div>

    <div className='flex flex-col justify-center'>
      <form onSubmit={handleSubmit} className='max-w-[400px] w-full mx-auto bg-gray-500 p-8 px-8 rounded-lg' action="">
          <h2 className='text-4xl text-white font-bold text-center'>LOGIN</h2>
          <div className='flex flex-col text-white py-2 '>
            <input onChange={(e)=>{setValues({...values, [e.target.name]:[e.target.value]})}} className='rounded-lg bg-gray-300 mt-2 p-2 focus:border-black focus:bg-gray-800 focus:outline-none' type="email" placeholder='Email' name='email' />
          </div>
          <div className='flex flex-col text-white py-2 '>
            <input onChange={(e)=>{setValues({...values, [e.target.name]:[e.target.value]})}} className='rounded-lg bg-gray-300 mt-2 p-2 focus:border-black focus:bg-gray-800 focus:outline-none' type="password" placeholder='Password' name='password' />
          </div>
          <button className='w-full my-5 py-2 bg-blue-900 rounded-lg shadow-lg shadow-slate-700/10 hover:shadow-slate-700/10 text-white font-semibold'>LOGIN</button>
          <button type='button' onClick={() => {
            login()
          }}>GOOGLE</button>
          <div>
            <span>Don't have an account? </span>
            <Link to="/register">
              Sign up
            </Link>
          </div>
        </form>
    </div>
  </div>
  )
}

export default Login