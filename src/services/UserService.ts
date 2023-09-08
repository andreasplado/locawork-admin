import axios from 'axios';
import authHeader from './AuthHeader';
import { AppConstants } from '../constants/AppConstants';
import UserEntity from '../types/userEntity.type';
import UserSettingsEntity from '../types/userSettingsEntity.type';

class UserService {
  getAllComments() {
    return axios.get(AppConstants.API_URL + '/comments');
  }

  getUsersBoard() {
    return axios.get(AppConstants.API_URL + '/users', { headers: authHeader() });
  }

  getUsersSettingsBoard(userId: number) {
    return axios.get(AppConstants.API_URL + '/settings/get-user-settings?userId='+userId, { headers: authHeader() });
  }

  getUserBoard(userId: number) {
    return axios.get(AppConstants.API_URL + '/users/get-user?id='+ userId,  { headers: authHeader() });
  }

  updateUserBoard(userId: number, userEntity: UserEntity) {
    return axios.put(AppConstants.API_URL + '/users/' + userId, { data: userEntity, headers: authHeader()} );
  }
  updateUserSettings(userId: number, userSettingsEntity: UserSettingsEntity) {
    return axios.put(AppConstants.API_URL + '/update-user-settings?userId=' + userId, { data: userSettingsEntity, headers: authHeader() });
  }


  searchUser(keyword : string) {
    return axios.get(AppConstants.API_URL + '/users/search?keyword=' + keyword, {headers: authHeader()} );
  }


  getModeratorBoard() {
    return axios.get(AppConstants.API_URL + 'mod', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(AppConstants.API_URL + 'admin', { headers: authHeader() });
  }
}

export default new UserService();