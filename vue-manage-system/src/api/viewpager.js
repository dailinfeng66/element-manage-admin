import request from '../utils/request';
//启用
export function ableViewpager(data) {
    return request({
        url: '/mgr/viewpager/enable/' + data,
        method: 'put'
    });
}

//禁用
export function disAbleViewpager(data) {
    return request({
        url: '/mgr/viewpager/disable/' + data,
        method: 'put'
    });
}
//查询所有信息
export function findAll(data) {
    return request({
        url: '/mgr/viewpager/info',
        method: 'post',
        data: data
    });
}

//添加信息
export function addviewpager(data) {
    return request({
        url: '/mgr/viewpager',
        method: 'post',
        data: data
    });
}

//更改百科信息
export function updateviewpager(data) {
    return request({
        url: '/mgr/viewpager',
        method: 'put',
        data: data
    });
}


//删除百科信息
export function deleteviewpager(data) {
    return request({
        url: '/mgr/viewpager/' + data,
        method: 'delete'
    });
}
