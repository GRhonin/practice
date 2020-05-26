// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'mint-ui/lib/style.css'
import './assets/reset.css'


import './assets/iconfont/iconfont.css'
import './assets/hotcss.js'
Vue.config.productionTip = false

// router.beforeEach((to, from, next) => {
//         console.log(to);
//         console.log(from);
//         console.log(window.localStorage.getItem('token'));
//         if (window.localStorage.getItem('token') == null || window.localStorage.getItem('token') != undefined) {
//             if (to.name == 'login') {
//                 next();
//             }
//         } else {
//             if (to.name == 'login') {
//                 next({
//                     path: '/home'
//                 })
//             }
//         }
//     })
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})
console.log('main');