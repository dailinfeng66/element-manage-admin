//获取标签页面列表
export function getTitles() {
    //roles 表示是那些权限可以访问的
    return [{
        icon: 'el-icon-lx-home',
        index: 'dashboard',
        title: '系统首页',
        roles: ['3', '2']
    },
        {
            icon: 'el-icon-lx-home',
            index: 'icon',
            title: '自定义图标',
            roles: ['3', '2']
        },
        {
            icon: 'el-icon-lx-shop',
            index: 'business',
            title: '优质服务管理', roles: ['30', '20']
        },
        {
            icon: 'el-icon-lx-people',
            index: 'user',
            title: '用户管理', roles: ['3']
        },
        {
            icon: 'el-icon-lx-read',
            index: 'goodsmenu',
            title: '首页分类管理', roles: ['3']
        },
        {
            icon: 'el-icon-lx-shopfill',
            index: 'dishmanage',
            title: '菜品管理', roles: ['2']
        }
    ];
}