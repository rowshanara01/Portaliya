import axios from "axios";
import { useEffect } from "react";
import useAuth from "./../useAuth/useAuth";

const useAxiosSecure = () => {
  const { logoutUser } = useAuth();
  // const navigate = useNavigate();

  const axiosSecure = axios.create({
    baseURL: "https://bangladesh-complaint-portal-server.onrender.com",
  });

  // request interceptor to add authorization header for every secure call to teh api
  useEffect(() => {
    axiosSecure.interceptors.request.use((config) => {
      const token = localStorage.getItem("access-token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          await logoutUser();
          // navigate("/login");
        }
        return Promise.reject(error);
      }
    );
  }, [logoutUser, axiosSecure]);

  return [axiosSecure];
};

export default useAxiosSecure;
