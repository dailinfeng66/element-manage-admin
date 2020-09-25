//alert
export function alert(res, _this) {
    if (res.status === 200 || res.status === '200') {
        _this.$notify({
            title: '成功',
            message: res.msg,
            type: 'success',
            duration: 2000
        });
    } else {
        _this.$notify({
            title: '失败',
            message: res.msg,
            type: 'error',
            duration: 2000
        });
    }
}

//装换状态
export function purse_status(status) {
    console.log(status);
    if (status == 1) {
        return true;
    } else if (status == 0) {
        return false;
    }
    return null;
}