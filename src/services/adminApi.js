import { adminAxiosInstance } from "../utils/axiosUtils";

const adminLogin = (value) => {
    return adminAxiosInstance.post("/login", value, {
        withCredentials:true
    })
}

const isAdminAuth =()=>{
    return adminAxiosInstance.get("/adminAuth",{
        withCredentials:true
    })
}

const userCount = ()=>{
    return adminAxiosInstance.get("/usercount",{
        withCredentials:true
    })
}

const reportCount = ()=>{
    return adminAxiosInstance.get("reportcount",{
        withCredentials:true
    })
}

const getUsers = ()=>{
    return adminAxiosInstance.get("/users",{
        withCredentials:true
    })
}

const getEvents = ()=>{
    return adminAxiosInstance.get("/events",{
        withCredentials:true
    })
}

const getCommunity = ()=>{
    return adminAxiosInstance.get("/communities",{
        withCredentials:true
    })
} 

const addArticle = (formData)=>{
    return adminAxiosInstance.post("/addarticle",formData,{
        withCredentials:true
    })
}

const editArticle = (id,formData) =>{
    return adminAxiosInstance.post(`/editarticle/${id}`,formData,{
        withCredentials:true
    })
}

const getArticles = ()=>{
    return adminAxiosInstance.get("/articles",{
        withCredentials:true
    })
}

const getReport = ()=>{
    return adminAxiosInstance.get(`/reports`,{
        withCredentials:true
    })
}

const userAction = (id)=>{
    return adminAxiosInstance.get(`/useraction/${id}`,{
        withCredentials:true
    })
}

const eventAction = (id)=>{
    return adminAxiosInstance.get(`/eventaction/${id}`,{
        withCredentials:true
    })
}

const communityAction = (id)=>{
    return adminAxiosInstance.get(`/communityAction/${id}`,{
        withCredentials:true
    })
}

const articleAction = (id)=>{
    return adminAxiosInstance.get(`/articleaction/${id}`,{
        withCredentials:true
    })
}

const reportAction = (id)=>{
    return adminAxiosInstance.get(`/reportaction/${id}`,{
        withCredentials:true
    })
}


export {
    adminLogin,
    isAdminAuth,
    userCount,
    reportCount,
    getUsers,
    getEvents,
    getCommunity,
    addArticle,
    editArticle,
    getArticles,
    getReport,
    userAction,
    eventAction,
    communityAction,
    articleAction,
    reportAction
}