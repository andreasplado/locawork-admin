import axios from "axios";
import { AppConstants } from "../constants/AppConstants";


class AuthService {
    login(email: string, password: string) {
      return axios
        .post(AppConstants.API_URL + "/auth/authenticate", {
          email: email,
          password: password
        })
        .then(response => {
          if (response.data.token) {
            localStorage.setItem("user", JSON.stringify(response.data.userEntity));
            localStorage.setItem("token", response.data.token);
          }
  
          return response.data;
        });
    }
  
    logout() {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
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

    getToken() {
      const token = localStorage.getItem("token");
      if (token) return token;
  
      return null;
    }
  }
  
  export default new AuthService();