import axios from "axios";

const axiosPath = axios.create({
  baseURL: "http://localhost:3000",
});
export default axiosPath;
