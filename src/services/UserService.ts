import axios from 'axios';
import authHeader from './AuthHeader';
import { AppConstants } from '../constants/AppConstants';

class UserService {
  getAllComments() {
    return axios.get(AppConstants.API_URL + '/comments');
  }

  getUsersBoard() {
    return axios.get(AppConstants.API_URL + '/users', { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(AppConstants.API_URL + 'mod', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(AppConstants.API_URL + 'admin', { headers: authHeader() });
  }
}

export default new UserService();