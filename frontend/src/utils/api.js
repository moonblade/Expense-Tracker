import axios from "axios";

const api = axios.create({
  baseURL: "https://expensetracker.moonblade.work/",
  // baseURL: "http://ubuntu.tailab18b.ts.net:20009/",
  auth: {
    username: "admin",
    password: process.env.NEXT_PUBLIC_API_PASSWORD
  }
});

export default api;