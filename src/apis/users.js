import axios from 'axios';
import { MONSTERBOT_API_ID, MONSTERBOT_API_AWS_URL_FRAGMENT, MONSTERBOT_API_STAGE} from '../config.json';

export default axios.create({
  baseURL: `https://${MONSTERBOT_API_ID}.${MONSTERBOT_API_AWS_URL_FRAGMENT}/${MONSTERBOT_API_STAGE}/users`,
  withCredentials: true
});
