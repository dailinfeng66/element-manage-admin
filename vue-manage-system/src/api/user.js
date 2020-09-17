import request from '../utils/request';

//启用
export function info(data) {
    return request({
        url: '/mgr/user/info',
        method: 'post',
        data: data
    });
}

//删除用户
export function delete_user(id) {
    return request({
        url: '/mgr/user/' + id,
        method: 'delete'
    });
}

//添加用户
export function add_user(data) {
    return request({
        url: '/mgr/user',
        method: 'post',
        data: data
    });
}

//更新用户
export function update_user(data) {
    return request({
        url: '/mgr/user',
        method: 'put',
        data: data
    });
}
