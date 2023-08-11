import axios from "axios";

const api = axios.create({
    baseURL : "https://todolist-qm3y.onrender.com/"
});

export default api;