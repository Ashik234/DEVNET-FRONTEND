import { userAxiosInstance } from "../utils/axiosUtils"

const userRegister = (data) => {
    return userAxiosInstance.post("/register", data, {
        withCredentials:true
    })
}

const userLogin = (data) => {
    return userAxiosInstance.post("/login", data, {
        withCredentials:true
    })
}

const userRegisterWithGoogle = (data) => {
    return userAxiosInstance.post("/googleRegister", data,{
        withCredentials:true
    })
}

const userLoginwithGoogle = (data) => {
    return userAxiosInstance.post("/googleLogin", data, {
        withCredentials:true
    })
}

export {
    userRegister,
    userLogin,
    userRegisterWithGoogle,
    userLoginwithGoogle
}