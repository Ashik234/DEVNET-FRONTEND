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

export {
    adminLogin,
    isAdminAuth
}