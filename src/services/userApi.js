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

const editProfile = (id,data)=>{
  return userAxiosInstance.post(`/profile/edit/${id}`,data,{
    withCredentials:true
  })
}

const getArticles =()=>{
  return userAxiosInstance.get("/articles",{
    withCredentials:true
  })
}

const getSingleArticle = (id)=>{
  return userAxiosInstance.get(`/viewarticle/${id}`,{
    withCredentials:true
  })
}

const likeArticle = (id)=>{
  return userAxiosInstance.post(`/likearticle/${id}`,{
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

const editQuestion =(id,data)=>{
  return userAxiosInstance.post(`/questions/edit/${id}`,data,{
    withCredentials:true
  })
}

const reportQuestion = (id,data)=>{
  return userAxiosInstance.post(`/questions/report/${id}`,data,{
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

const editAnswer = (id,data)=>{
  return userAxiosInstance.post(`/answer/edit/${id}`,data,{
    withCredentials:true
  })
}

const answerVerified = (id)=>{
  return userAxiosInstance.post(`/verified/${id}`,{
    withCredentials:true
  })
}

const searchQuestions = (searchQuery) => {
  return userAxiosInstance.get(`/searchquestions?query=${searchQuery}`, {
    withCredentials: true,
  });
};


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

const editCommunity =(id,data)=>{
  return userAxiosInstance.post(`/viewcommunity/${id}`,data,{
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

const searchCommunity = (searchQuery) => {
  return userAxiosInstance.get(`/searchcommunity?query=${searchQuery}`, {
    withCredentials: true,
  });
};


//EVENT

const createEvent = (id,data)=>{
  return userAxiosInstance.post(`/create/${id}`,data,{
    withCredentials:true
  })
}

const editEvent=(id,data)=>{
  return userAxiosInstance.post(`/viewcommunities/${id}`,data,{
    withCredentials:true
  })
}

const getAllEvents = ()=>{
  return userAxiosInstance.get("/events",{
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

const searchEvents = (searchQuery) => {
  return userAxiosInstance.get(`/searchevents?query=${searchQuery}`, {
    withCredentials: true,
  });
};

// INDIVIDUAL CHAT

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

// DISCUSSION CHAT

const addmessage = (data)=>{
  return userAxiosInstance.post("/addchat",data,{
    withCredentials:true
  })
}

const getAllMessage = (id)=>{
  return userAxiosInstance.get(`/getallmessages/${id}`,{
    withCredentials:true
  })
}

export {
  userRegister,
  userLogin,
  userRegisterWithGoogle,
  userLoginwithGoogle,
  isUserAuth,
  editProfile,
  getArticles,
  getSingleArticle,
  likeArticle,
  askQuestion,
  saveQuestion,
  getSavedQuestions,
  getQuestion,
  editQuestion,
  reportQuestion,
  getSingleQuestion,
  submitAnswer,
  editAnswer,
  answerVerified,
  searchQuestions,
  askedQuestions,
  createCommunity,
  editCommunity,
  getCommunity,
  getSingleCommunity,
  joinCommunity,
  searchCommunity,
  createEvent,
  editEvent,
  getAllEvents,
  getEvents,
  getSingleEvent,
  searchEvents,
  createChat,
  userChat,
  userGetMessages,
  userSendMessage,
  userGetDetails,
  addmessage,
  getAllMessage,
};