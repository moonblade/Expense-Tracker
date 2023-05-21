import axios from axios;

const api = axios.create({
  baseURL: 'http://expensetracker.moonblade.work/'
})

export default api;