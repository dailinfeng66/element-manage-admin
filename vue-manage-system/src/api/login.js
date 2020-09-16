import request from '../utils/request';

//启用
export function login(data) {
    return request({
        url: '/mgr/shop/enable/' + data,
        method: 'put'
    });
}