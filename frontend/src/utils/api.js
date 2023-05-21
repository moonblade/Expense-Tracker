import axios from "axios";

const api = axios.create({
  baseURL: "https://expensetracker.moonblade.work/",
  auth: {
    username: "admin",
    password: process.env.NEXT_PUBLIC_API_PASSWORD
  }
});

export default api;