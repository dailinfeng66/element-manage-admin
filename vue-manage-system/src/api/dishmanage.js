import request from '../utils/request';

//查询
export function info(data) {
    return request({
        url: '/mgr/dish/info',
        method: 'post',
        data: data
    });
}

//添加菜品
export function add_dish(data) {
    return request({
        url: '/mgr/dish',
        method: 'post',
        data: data
    });
}

//更新菜品
export function update_dish(data) {
    return request({
        url: '/mgr/dish',
        method: 'put',
        data: data
    });
}

//删除菜品
export function delete_dish(id) {
    return request({
        url: '/mgr/dish/' + id,
        method: 'delete'
    });
}