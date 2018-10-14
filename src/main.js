import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import VueRouter from 'vue-router'
import store from './vuex/store'
import Vuex from 'vuex'
import routes from './routes'
import 'font-awesome/css/font-awesome.min.css'
import {level} from './api/api.js'

Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.use(Vuex);

let l = routes;
//查询管理员级别
level().then((res) => {

    console.log(res.data);
    if (res.data == null) {
        return;
    }
    if (res.data != 'GENERAL') {
        routes.find((x) => {
            if (x.name == '管理员操作') {
                x.hidden = false;
            }
        })
    }

});
const router = new VueRouter({
    routes
});


if (process.env.NODE_ENV === 'development') {
    //测试环境
} else {
    router.beforeEach((to, from, next) => {

        if (to.path == '/auth') {
            localStorage.removeItem('manage');
        }
        let user = JSON.parse(localStorage.getItem('manage'));

        if (!user && (to.path.indexOf('/manage') != -1 || to.path.indexOf('/admin') != -1)) {
            next({path: '/noauth'})
        } else {
            next()
        }
    })
}


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');




