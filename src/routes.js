import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Select from './views/nav1/Select.vue'
import CreatePay from './views/nav1/CreatePay.vue'
import ManageAdmin from './views/nav2/ManageAdmin.vue'
import Bill from './views/nav2/Bill.vue'
import Home from './views/Home.vue'


import PaymentCommon from './views/pay/PayCommon.vue'
import PayReturn from './views/pay/PayReturn.vue'


import Page6 from './views/nav3/Page6.vue'
import echarts from './views/charts/echarts.vue'

import Noauth from './views/Noauth'
import Auth from './views/Auth'

let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    {
        path: '/',
        component: Home,
        name: '缴费管理',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            {path: '/manage/select', component: Select, name: '查看缴费'},
            {path: '/manage/create', component: CreatePay, name: '新建缴费'},
        ]
    },

    {
        path: '/',
        component: Home,
        name: '管理员操作',
        iconCls: 'fa fa-id-card-o',
        children: [
            {path: '/admin/admin', component: ManageAdmin, name: '管理部门管理员'},
            {path: '/admin/bill', component: Bill, name: '管理税号'},
        ],
        hidden: true
    },

    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-address-card',
        leaf: true,//只有一个节点
        hidden: true,
        children: [
            {path: '/page6', component: Page6, name: '导航三'}
        ]
    },
    {
        path: '/',
        component: Home,
        name: 'Charts',
        iconCls: 'fa fa-bar-chart',
        hidden: true,
        children: [
            {path: '/echarts', component: echarts, name: 'echarts'}
        ]
    },
    {
        path: '/noauth',
        component: Noauth,
        hidden: true
    },
    {
        path: '/pay',
        component: PaymentCommon,
        hidden: true
    },
    {
        path: '/payreturn',
        component: PayReturn,
        hidden: true
    },
    {
        path: '/auth',
        component: Auth,
        hidden: true
    },
    // {
    //     path: '*',
    //     hidden: true,
    //     redirect: { path: '/404' }
    // }
];

export default routes;