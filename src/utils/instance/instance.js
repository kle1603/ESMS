import configs from "@/configs";
import axios from "axios";

// console.log(configs.publicRuntime.API_URL);

const instance = axios.create({
    baseURL: configs.publicRuntime.API_URL,
    // timeout: 1000,
});

export default instance;


