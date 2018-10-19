import axios from 'axios';

const fetch = axios.create({
    headers: {
        'Content-Type': 'application/json',
    },
});

fetch.defaults.withCredentials = true;

export default function request(options = { needAuth: true, method: 'GET' }) {
    options = { ...{ needAuth: true, method: 'GET' }, ...options }
    let { path, method, params, needAuth } = options;

    let user = localStorage.getItem('user');
    if (needAuth && !user) {
        // 没有登陆过 没有权限操作
        return;
    }

    if (method === 'GET') {
        return fetch.get(path, { params: params }).then(res => {
            if (res.data.code === 401) {
                // 没有权限 重新登陆
                window.location.href = '#/login';
            } else {
                // 正常返回，具体业务具体处理
                return res.data;
            }
        });
    } else if (method === 'POST') {
        return fetch.post(path, JSON.stringify(params)).then(res => {
            if (res.data.code === 401) {
                 // 没有权限 重新登陆
                window.location.href = '#/login';
            } else {
                // 正常返回，具体业务具体处理
                return res.data;
            }
        });
    }

}