import configs from "@/configs";
import axios from "axios";
// import cookies from "../cookies";

// const token = cookies.getToken();

const instance = axios.create({
    baseURL: configs.publicRuntime.API_URL,
    // timeout: 1000,
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
    },
    credentials: "include",
    withCredentials: true,
});

export default instance;
