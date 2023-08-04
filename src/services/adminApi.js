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

const reportAction = (id)=>{
    return adminAxiosInstance.get(`/reportaction/${id}`,{
        withCredentials:true
    })
}


export {
    adminLogin,
    isAdminAuth,
    getUsers,
    getEvents,
    getCommunity,
    getReport,
    userAction,
    eventAction,
    communityAction,
    reportAction
}