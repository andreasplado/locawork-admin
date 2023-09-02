import axios from 'axios';
import authHeader from './AuthHeader';
import { AppConstants } from '../constants/AppConstants';

class JobsService {
  getJobApplicationsBoard() {
    return axios.get(AppConstants.API_URL + '/jobapplications', { headers: authHeader() });
  }

  getUserJobApplications(userId: number) {
    return axios.get(AppConstants.API_URL + '/my-applications?userId=' + userId, { headers: authHeader() });
  }
}

export default new JobsService();