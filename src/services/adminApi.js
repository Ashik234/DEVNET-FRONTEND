import { adminAxiosInstance } from "../utils/axiosUtils";

const adminLogin = (value) => {
    return adminAxiosInstance.post("/login", value, {
        withCredentials:true
    })
}

export {
    adminLogin
}