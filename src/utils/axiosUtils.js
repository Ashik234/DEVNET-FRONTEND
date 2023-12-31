import axios from "axios";
import { userBaseUrl, adminBaseUrl } from "../constants/constants";

const createAxiosClient = (baseURL) => {
  const client = axios.create({
    baseURL,
    timeout: 6000,
    timeoutErrorMessage: "Request timeout Please Try Again!!!",
  });
  return client;
};

const attachToken = (req, tokenName) => {
  let authToken = localStorage.getItem(tokenName);
  if (authToken) {
    req.headers.Authorization = `Bearer ${authToken}`;
  }
  return req;
};

const userAxiosInstance = createAxiosClient(userBaseUrl);
userAxiosInstance.interceptors.request.use(async (req) => {
  const modifiedReq = attachToken(req, "userJWT");
  return modifiedReq;
});

const adminAxiosInstance = createAxiosClient(adminBaseUrl);
adminAxiosInstance.interceptors.request.use(async (req) => {
  const modifiedReq = attachToken(req, "adminJWT");
  return modifiedReq;
});

export { userAxiosInstance, adminAxiosInstance };