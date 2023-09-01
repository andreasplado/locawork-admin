import axios from 'axios';
import authHeader from './AuthHeader';
import { AppConstants } from '../constants/AppConstants';

class JobsService {


  getJobApplicationsBoard() {
    return axios.get(AppConstants.API_URL + '/jobapplications', { headers: authHeader() });
  }
}

export default new JobsService();