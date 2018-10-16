import axios from 'axios';

const fetch = axios.create({
    headers: {
        'Content-Type': 'application/json',
    },
});

fetch.defaults.withCredentials = true;

export default function request(options) {
    let { path, method, params } = options;

    if (method === 'GET') {
       return fetch.get(path, { params: params }).then(res => {
            if (res.data.code === 401) {
                // 没有权限操作
                console.warn('没有权限操作!');
            }else{

                // 正常返回，具体业务具体处理
                return res.data;
            }
        });
    } else if (method === 'POST') {
        fetch.post(path, JSON.stringify(params)).then(res => res.data);
    }

}