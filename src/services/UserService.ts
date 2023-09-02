import axios from 'axios';
import authHeader from './AuthHeader';
import { AppConstants } from '../constants/AppConstants';
import UserEntity from '../types/userEntity.type';

class UserService {
  getAllComments() {
    return axios.get(AppConstants.API_URL + '/comments');
  }

  getUsersBoard() {
    return axios.get(AppConstants.API_URL + '/users', { headers: authHeader() });
  }

  getUserBoard(userId: number) {
    return axios.get(AppConstants.API_URL + '/users', { headers: authHeader() });
  }

  updateUserBoard(userId: number, userEntity: UserEntity) {
    return axios.post(AppConstants.API_URL + '/users', {userEntity}, { headers: authHeader()} );
  }



  getModeratorBoard() {
    return axios.get(AppConstants.API_URL + 'mod', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(AppConstants.API_URL + 'admin', { headers: authHeader() });
  }
}

export default new UserService();