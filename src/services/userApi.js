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

const getSingleUser = (id)=>{
  return userAxiosInstance.get(`/profile/edit/${id}`,{
    withCredentials:true
  })
}

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

const answerVerified = (id)=>{
  return userAxiosInstance.post(`/verfied/${id}`,{
    withCredentials:true
  })
}

const searchQuestions = (query)=>{
  return userAxiosInstance.get(`/searchquestions?q=${query}`,{
    withCredentials:true
  })
}

const askedQuestions = (id)=>{
  return userAxiosInstance.get(`/askedquestions/${id}`,{
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

const getAllEvents = ()=>{
  return userAxiosInstance.get("events",{
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

// CHAT

const createChat = (data)=>{
  return userAxiosInstance.post(`/createchat`,data,{
    withCredentials:true
  })
}

const userChat =(userId)=>{
  return userAxiosInstance.get(`/getchat/${userId}`,{
    withCredentials:true
  })
}

const userGetMessages = (chatId)=>{
  return userAxiosInstance.get(`/getmessages/${chatId}`,{
    withCredentials:true
  })
}

const userSendMessage = (data)=>{
  return userAxiosInstance.post("/addmessage",data,{
    withCredentials:true
  })
}

const userGetDetails = (userId) => {
  return userAxiosInstance.post(`/usergetdetails/${userId}`, {
    withCredentials: true,
  });
};

export {
  userRegister,
  userLogin,
  userRegisterWithGoogle,
  userLoginwithGoogle,
  isUserAuth,
  getSingleUser,
  askQuestion,
  saveQuestion,
  getSavedQuestions,
  getQuestion,
  getSingleQuestion,
  submitAnswer,
  answerVerified,
  searchQuestions,
  askedQuestions,
  createCommunity,
  getCommunity,
  getSingleCommunity,
  joinCommunity,
  createEvent,
  getAllEvents,
  getEvents,
  getSingleEvent,
  createChat,
  userChat,
  userGetMessages,
  userSendMessage,
  userGetDetails
};
