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

import Maintain from '@views/maintain/index'

let routes = [
    {
        path: '/dashboard',
        component: Home,
        name: 'Dashboard',
        leaf: true,
        children: [
            { path: '', component: NotFound, },
        ]
    },
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
        path: '/common',
        component: Home,
        name: '缴费管理',
        iconCls: 'el-icon-message',//图标样式class
        permission: ['DEP', 'SUPPER'],
        children: [
            { path: '/common/select', component: Select, name: '查看缴费', key: '101', },
            { path: '/common/create', component: EditPay, name: '新建缴费', key: '102' },
            { path: '/common/:type/:id', component: EditPay, permission: ['BAN'], },
        ]
    },

    {
        path: '/admin',
        component: Home,
        name: '管理员操作',
        permission: ['SUPPER'],
        key: '200',
        children: [
            { path: '/admin/admin', component: ManageAdmin, name: '管理部门管理员', key: '201' },
            { path: '/admin/bill', component: Bill, name: '管理税号', key: '202' },
        ],
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
    {
        path: '/maintain',
        component: Maintain,
        permission: ['BAN']
    },
    // {
    //     path: '*',
    //      permission: ['BAN'],
    //     redirect: { path: '/404' }
    // }
];

export default routes;