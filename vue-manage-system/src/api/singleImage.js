import request from '../utils/request';
import axios from 'axios';

//https://www.youji999.top/img/uploadpic/0
export function uploadpic(param) {
    return axios.post('https://www.youji999.top/img/uploadpic/0', param);
}