import request from '../utils/request';

//启用
export function login(data) {
    return request({
        url: '/mgr/user/login',
        method: 'post',
        data: data
    });
}