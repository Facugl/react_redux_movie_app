import axios from 'axios';
const url = import.meta.env.VITE_URL_API;

const axiosInstance = axios.create();

axiosInstance.defaults.baseURL = url;

export default axiosInstance;
