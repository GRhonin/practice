import Vue from 'vue'
import axios from 'axios'
import router from '../router';
const root = process.env.API_ROOT;
// 创建axios实例
const service = axios.create({
    timeout: 1000 * 30,
    baseURL: root,
    // 允许跨域带cookie
    // withCredentials: true,
    headers: {
        'Content-Type': 'application/json; charset=utf-8'
    }
})

// request拦截器
service.interceptors.request.use(
    (config) => {
        config.headers['token'] = window.localStorage.getItem('token') || '';
        return config
    },
    (error) => {
        return Promise.reject(error)
    })

// response拦截器
service.interceptors.response.use(response => {
    // if (response.data && response.data.code === 401) { // 401, token失效
    //     Vue.cookie.delete('token')
    //     router.push({ name: 'login' })
    // }
    if (response.data && response.data.msg == 'login failed') {
        window.localStorage.removeItem('token');
        router.push({ name: 'login' })
    }
    return response
}, error => {
    return Promise.reject(error)
})

export default service