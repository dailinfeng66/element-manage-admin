import request from '../utils/request';
import da from 'element-ui/src/locale/lang/da';

//启用
export function ableClubActivity(data) {
    return request({
        url: '/mgr/club_activity/enable/' + data,
        method: 'put'
    });
}

//禁用
export function disAbleClubActivity(data) {
    return request({
        url: '/mgr/club_activity/disable/' + data,
        method: 'put'
    });
}

//查找全部
export function getDataList(data) {
    return request({
        url: '/mgr/club_activity/info',
        method: 'post',
        data: data
    });
}

//删除活动
export function deleteById(id) {
    return request({
        url: '/mgr/club_activity/' + id,
        method: 'delete'
    });
}

//添加活动
export function insertActivity(data) {
    return request({
        url: '/mgr/club_activity',
        method: 'post',
        data: data
    });
}

//修改活动
export function updateActivity(data) {
    return request({
        url: '/mgr/club_activity',
        method: 'put',
        data: data
    });
}
