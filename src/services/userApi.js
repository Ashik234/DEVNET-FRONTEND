import { userAxiosInstance } from "../utils/axiosUtils";

const userRegister = (data) => {
  return userAxiosInstance.post("/register", data, {
    withCredentials: true,
  });
};

const userLogin = (data) => {
  return userAxiosInstance.post("/login", data, {
    withCredentials: true,
  });
};

const userRegisterWithGoogle = (data) => {
  return userAxiosInstance.post("/googleRegister", data, {
    withCredentials: true,
  });
};

const userLoginwithGoogle = (data) => {
  return userAxiosInstance.post("/googleLogin", data, {
    withCredentials: true,
  });
};

const isUserAuth = () => {
  return userAxiosInstance.get("/userAuth", {
    withCredentials: true,
  });
};

const askQuestion = (data) => {
    return userAxiosInstance.post("/ask",data,{
      withCredentials: true,
    })
};

const getQuestion =()=>{
  return userAxiosInstance.get("/questions",{
    withCredentials:true
  })
}

const getSingleQuestion = (id)=>{
  return userAxiosInstance.get(`/viewquestion/${id}`,{
    withCredentials:true
  })
}

const submitAnswer = (id,data)=>{
  return userAxiosInstance.post(`/answer/${id}`,data,{
    withCredentials:true
  })
}

const createCommunity =(data)=>{
  return userAxiosInstance.post("/createcommunity",data,{
    withCredentials:true
  })
}

export {
  userRegister,
  userLogin,
  userRegisterWithGoogle,
  userLoginwithGoogle,
  isUserAuth,
  askQuestion,
  getQuestion,
  getSingleQuestion,
  submitAnswer,
  createCommunity
};
