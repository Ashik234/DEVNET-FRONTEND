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

// QUESTIONS

const askQuestion = (data) => {
    return userAxiosInstance.post("/ask",data,{
      withCredentials: true,
    })
};

const saveQuestion = (id)=>{
  return userAxiosInstance.post(`/save/${id}`,{
    withCredentials:true
  })
}

const getSavedQuestions = (id)=>{
  return userAxiosInstance.get(`/savedquestions/${id}`,{
    withCredentials:true
  })
}

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

const searchQuesions = ()=>{
  return userAxiosInstance.get("/searchquestions",{
    withCredentials:true
  })
}

// COMMUNITY

const createCommunity =(id,data)=>{
  return userAxiosInstance.post(`/createcommunity/${id}`,data,{
    withCredentials:true
  })
}

const getCommunity =()=>{
  return userAxiosInstance.get("/communities",{
    withCredentials:true
  })
}

const getSingleCommunity =(id)=>{
  return userAxiosInstance.get(`/viewcommunity/${id}`,{
    withCredentials:true
  })
}

const joinCommunity =(id)=>{
  return userAxiosInstance.post(`/join/${id}`,{
    withCredentials:true
  })
}

//EVENT

const createEvent = (id,data)=>{
  return userAxiosInstance.post(`/create/${id}`,data,{
    withCredentials:true
  })
}

const getEvents = (id)=>{
  return userAxiosInstance.get(`/events/${id}`,{
    withCredentials:true
  })
}

const getSingleEvent =(id)=>{
  return userAxiosInstance.get(`/viewevent/${id}`,{
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
  saveQuestion,
  getSavedQuestions,
  getQuestion,
  getSingleQuestion,
  submitAnswer,
  searchQuesions,
  createCommunity,
  getCommunity,
  getSingleCommunity,
  joinCommunity,
  createEvent,
  getEvents,
  getSingleEvent
};
