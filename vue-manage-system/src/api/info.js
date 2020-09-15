import request from '../utils/request';

//启用
export function ableInfo(data) {
    return request({
        url: '/mgr/info/enable/' + data,
        method: 'put'
    });
}
//禁用
export function disableInfo(data) {
    return request({
        url: '/mgr/info/disable/' + data,
        method: 'put'
    });
}
//查询所有信息
export function findAll(data) {
    return request({
        url: '/mgr/info/info',
        method: 'post',
        data: data
    });
}

//添加百科信息
export function addMessage(data) {
    return request({
        url: '/mgr/info',
        method: 'post',
        data: data
    });
}

//更改百科信息
export function updateMessage(data) {
    return request({
        url: '/mgr/info',
        method: 'put',
        data: data
    });
}


//删除百科信息
export function deleteMessage(data) {
    return request({
        url: '/mgr/info/' + data,
        method: 'delete'
    });
}