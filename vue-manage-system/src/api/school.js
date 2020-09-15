import request from '../utils/request';

//查询所有信息
export function findAll(data) {
    return request({
        url: '/mgr/School/info',
        method: 'post',
        data: data
    });
}

//添加信息
export function addSchool(data) {
    return request({
        url: '/mgr/School',
        method: 'post',
        data: data
    });
}

//更改百科信息
export function updateSchool(data) {
    return request({
        url: '/mgr/School',
        method: 'put',
        data: data
    });
}


//删除百科信息
export function deleteSchool(data) {
    return request({
        url: '/mgr/School/' + data,
        method: 'delete'
    });
}
