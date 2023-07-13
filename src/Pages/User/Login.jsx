import React,{useState,useEffect} from 'react'
import loginIMG from '../../assets/login.jpg';
import { useNavigate,Link } from 'react-router-dom'
import { userLogin,userLoginwithGoogle } from '../../services/userApi';
import { toast } from 'react-toastify'
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { changeUserDetails } from '../../Redux/user/UserSlice';
import { useDispatch } from "react-redux";


function Login() {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

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
              } else if (!res.data.exists) {
                toast.warn("Account Not Registered");
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
          if (res.data.status) {
            dispatch(
              changeUserDetails({
                userId:res.data.user._id,
                username:res.data.user.username,
                email:res.data.user.email,
              })
            )
            localStorage.setItem("userJWT", res.data.token);   
            toast.success(res.data.message);
            navigate("/");
          } else {
            return toast.warn("Account Already Exists");
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
      <form onSubmit={handleSubmit} className='max-w-[400px] w-full mx-auto p-8 px-8 rounded-lg' >
          <h2 className='text-4xl text-black font-bold text-center'>LOGIN</h2>
          <div className='flex flex-col text-white py-2 '>
            <input onChange={(e)=>{setValues({...values, [e.target.name]:[e.target.value]})}} className='rounded-lg bg-gray-300 mt-2 p-2  ' type="email" placeholder='Email' name='email' />
          </div>
          <div className='flex flex-col text-white py-2 '>
            <input onChange={(e)=>{setValues({...values, [e.target.name]:[e.target.value]})}} className='rounded-lg bg-gray-300 mt-2 p-2   ' type="password" placeholder='Password' name='password' />
          </div>
          <div className="flex justify-center">
          <button className='mx-auto my-5 py-2 px-4 w-48 bg-blue-900 rounded-lg  text-white font-semibold'>LOGIN</button>
          </div>
          <div className="flex justify-center">
          <button className='mx-auto my-5 py-2 px-4 w-48 bg-gray-400 rounded-lg text-white font-semibold shadow-lg transform transition hover:scale-105 focus:outline-none' type='button' onClick={() => {
            login()
          }}>
          <FcGoogle className="inline-block w-5 h-6 mr-2"/>
          <span className="font-normal align-middle">Google Sign in</span>
          </button>
          </div>
          <div className="flex justify-center">
            <span className='font-light'>Don't have an account? </span>
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