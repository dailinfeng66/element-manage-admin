import request from '../utils/request';


export function findAll(data) {
    return request({
        url: '/mgr/user/info',
        method: 'post',
        data: data
    });
}