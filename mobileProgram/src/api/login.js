import service from './https'
import qs from 'qs'
// 获取用户授权
export const getAuthorize = (params) => {
        let data = {
            app: 'userapp',
            act: 'getwxjsapi',
        }
        return service.post(`index.php?${qs.stringify(Object.assign(data, params))}`);
    }
    // 登录
export const userLogin = (data) => {
        let str = '';
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                const element = data[key];
                str += `${key}=${element}&`
            }
        }
        let params = str.substring(0, str.length - 1);
        return service.post(`index.php?${params}`);
    }
    // 获取验证码
export const userCode = (data) => {
        return service.post(`index.php?${qs.stringify(data)}`)
    }
    // 获取地区
export const getArea = (data) => {
    var defaultData = {
        app: 'wxloginapp',
        act: 'get_area',
        token: window.localStorage.getItem('token')
    }
    return service.post(`index.php?${qs.stringify(Object.assign(defaultData, data))}`);
}