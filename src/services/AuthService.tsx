import axios from "axios";
import { AppConstants } from "../constants/AppConstants";


class AuthService {
    login(email: string, password: string) {
      return axios
        .post(AppConstants.API_URL + "/auth/authenticate", {
          username: email,
          password
        })
        .then(response => {
          if (response.data.accessToken) {
            localStorage.setItem("user", JSON.stringify(response.data));
          }
  
          return response.data;
        });
    }
  
    logout() {
      localStorage.removeItem("user");
    }
  
    register(email: string, contact: string, password: string, fullName : string) {
      return axios.post(AppConstants.API_URL + "/users/signup", {
        email,
        contact,
        password,
        fullName
      });
    }
  
    getCurrentUser() {
      const userStr = localStorage.getItem("user");
      if (userStr) return JSON.parse(userStr);
  
      return null;
    }
  }
  
  export default new AuthService();