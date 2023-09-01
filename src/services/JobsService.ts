import axios from 'axios';
import authHeader from './AuthHeader';
import { AppConstants } from '../constants/AppConstants';

class JobsService {


  getJobsBoard() {
    return axios.get(AppConstants.API_URL + '/jobs/all-jobs', { headers: authHeader() });
  }
}

export default new JobsService();