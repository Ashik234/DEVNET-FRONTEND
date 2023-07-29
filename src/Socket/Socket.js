import { io } from "socket.io-client";
import { userBaseUrl } from "../constants/constants";

const socketInstance = io(userBaseUrl)

export default socketInstance