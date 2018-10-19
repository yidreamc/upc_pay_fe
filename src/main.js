import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import VueRouter from 'vue-router'
import store from './vuex/store'
import Vuex from 'vuex'
import routes from './routes'
import 'font-awesome/css/font-awesome.min.css'

Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.use(Vuex);

const router = new VueRouter({
    routes
});

router.beforeEach((to, from, next) => {
    if (to.path.indexOf('/auth') != -1 || to.path.indexOf('/login') != -1) {
        next()
    } else {
        const user = JSON.parse(localStorage.getItem('user'));
        if(!user){

            // 用户未登陆
        }else{
            next();
        }
    }
})

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');




