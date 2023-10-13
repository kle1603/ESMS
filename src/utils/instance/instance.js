import configs from "@/configs";
import axios from "axios";

// const token = document.cookie; // Thay thế 'your-token-here' bằng token thực tế của bạn

const instance = axios.create({
    baseURL: configs.publicRuntime.API_URL,
    // timeout: 1000,
    // headers: {
    //     Authorization: `Bearer ${token}`,
    // },
    // headers: Object.assign({}, { Authorization: `Bearer ${token}` }),
});

export default instance;
