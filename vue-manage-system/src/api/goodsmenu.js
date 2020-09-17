import request from '../utils/request';

//查询
export function info(data) {
    return request({
        url: '/mgr/shop_type/info',
        method: 'post',
        data: data
    });
}

//禁用
export function disable_goods(id) {
    return request({
        url: '/mgr/shop_type/disable/' + id,
        method: 'put'
    });
}

//启用
export function enable_goods(id) {
    return request({
        url: '/mgr/shop_type/enable/' + id,
        method: 'put'
    });
}

//添加
export function add_goods(data) {
    return request({
        url: '/mgr/shop_type',
        method: 'post',
        data: data
    });
}

//修改
export function update_goods(data) {
    return request({
        url: '/mgr/shop_type',
        method: 'put',
        data: data
    });
}

//删除
export function delete_goods(id) {
    return request({
        url: '/mgr/shop_type/'+id,
        method: 'delete'
    });
}

