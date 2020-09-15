import request from '../utils/request';
import da from 'element-ui/src/locale/lang/da';

//查询所有信息
export function findAll(data) {
    return request({
        url: '/mgr/liar/info',
        method: 'post',
        data: data
    });
}

//添加信息
export function addLiar(data) {
    return request({
        url: '/mgr/liar',
        method: 'post',
        data: data
    });
}

//更改百科信息
export function updateLiar(data) {
    return request({
        url: '/mgr/liar',
        method: 'put',
        data: data
    });
}


//删除百科信息
export function deleteLiar(data) {
    return request({
        url: '/mgr/liar/' + data,
        method: 'delete'
    });
}
