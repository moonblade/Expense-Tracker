import axios from "axios";

const api = axios.create({
  baseURL: "http://expensetracker.moonblade.work/",
  auth: {
    username: "admin",
    password: process.env.REACT_APP_API_PASS
  }
});

export default api;