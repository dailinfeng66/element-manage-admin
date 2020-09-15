import request from '../utils/request';

//启用
export function ableShop(data) {
    return request({
        url: '/mgr/shop/enable/' + data,
        method: 'put'
    });
}

//禁用
export function disableShop(data) {
    return request({
        url: '/mgr/shop/disable/' + data,
        method: 'put'
    });
}

//查询所有信息
export function findAll(data) {
    return request({
        url: '/mgr/shop/info',
        method: 'post',
        data: data
    });
}

//添加百科信息
export function addMessage(data) {
    return request({
        url: '/mgr/shop',
        method: 'post',
        data: data
    });
}

//更改百科信息
export function updateMessage(data) {
    return request({
        url: '/mgr/shop',
        method: 'put',
        data: data
    });
}


//删除商家信息
export function deleteMessage(data) {
    return request({
        url: '/mgr/shop/' + data,
        method: 'delete'
    });
}