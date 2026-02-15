import axios from "axios"
import * as SecureStorage from "expo-secure-store"

const api = axios.create({
  baseURL: "https://bookswap-backend-production-3175.up.railway.app/api/v1",
  headers: {
    'Content-Type': 'multipart/form-data',
  },
})

api.interceptors.request.use(async (config)=> {
  const token = await SecureStorage.getItemAsync("userToken")  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

export default api;