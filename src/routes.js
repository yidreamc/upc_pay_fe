import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Select from './views/nav1/Select.vue'
import EditPay from './views/common/Edit'
import ManageAdmin from './views/nav2/ManageAdmin.vue'
import Bill from './views/nav2/Bill.vue'
import Home from './views/Home.vue'


import PaymentCommon from './views/pay/PayCommon.vue'
import PayReturn from './views/pay/PayReturn.vue'


import echarts from './views/charts/echarts.vue'

import Noauth from './views/Noauth'
import Auth from './views/Auth'

let routes = [
    {
        path: '/login',
        component: Login,
        permission: ['BAN']
    },
    {
        path: '/404',
        component: NotFound,
        permission: ['BAN']
    },
    {
        path: '/',
        component: Home,
        name: '缴费管理',
        iconCls: 'el-icon-message',//图标样式class
        permission: ['DEP', 'SUPPER'],
        children: [
            { path: '/common/select', component: Select, name: '查看缴费', key: 101, },
            { path: '/common/create', component: EditPay, name: '新建缴费', key: 102 },
            { path: '/common/:type/:id', component: EditPay, permission: ['BAN'],},
        ]
    },

    {
        path: '/',
        component: Home,
        name: '管理员操作',
        permission: ['SUPPER'],
        children: [
            { path: '/admin/admin', component: ManageAdmin, name: '管理部门管理员' },
            { path: '/admin/bill', component: Bill, name: '管理税号' },
        ],
    },

    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-address-card',
        leaf: true,//只有一个节点
        permission: ['BAN'],
        children: [
            // { path: '/page6', component: Page6, name: '导航三' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: 'Charts',
        iconCls: 'fa fa-bar-chart',
        permission: ['BAN'],
        children: [
            { path: '/echarts', component: echarts, name: 'echarts' }
        ]
    },
    {
        path: '/noauth',
        component: Noauth,
        permission: ['BAN']
    },
    {
        path: '/pay',
        component: PaymentCommon,
        permission: ['BAN']
    },
    {
        path: '/payreturn',
        component: PayReturn,
        permission: ['BAN']
    },
    {
        path: '/auth',
        component: Auth,
        permission: ['BAN']
    },
    // {
    //     path: '*',
    //      permission: ['BAN'],
    //     redirect: { path: '/404' }
    // }
];

export default routes;