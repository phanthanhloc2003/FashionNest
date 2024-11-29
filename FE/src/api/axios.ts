import axios, { AxiosInstance } from "axios";
// import { getNewAccsessToken } from "./user";
const apiClient: AxiosInstance = axios.create({
  baseURL: "http://localhost:3333/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);



// axios.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     const { config, response } = error;
//     if (
//       config.url !== "/login" &&
//       response &&
//       (response.status === 401)
//     ) {
//       const originalRequest = config;
//       try {
//         const newAccessToken = await getNewAccsessToken();
//         if(newAccessToken){
//           originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
//           return axios(originalRequest);
//         }
//       } catch (refreshError) {
//         console.error("Refresh token failed:", refreshError);
//       }
//     }
//     console.error("API Error:", response ? response.data : error.message);
//     return Promise.reject(error);
//   }
// );

export default apiClient;
