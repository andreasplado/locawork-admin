import axios from 'axios';
import authHeader from './AuthHeader';
import { AppConstants } from '../constants/AppConstants';

class UserService {
  getPublicContent() {
    return axios.get(AppConstants.API_URL + '');
  }

  getUserBoard() {
    return axios.get(AppConstants.API_URL + 'user', { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(AppConstants.API_URL + 'mod', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(AppConstants.API_URL + 'admin', { headers: authHeader() });
  }
}

export default new UserService();