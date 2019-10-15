/**
 * axio，标准化的暴露 promise
 * @author 云淡然
 * @createdAt 2019年08月17日16:08:32
 */

import { stringify } from '../utils/querystring';
import axios from 'axios';

const service = axios.create({
    // baseURL: 'http://192.168.8.14:9012',
    withCredentials: true // 允许携带cookie
});

service.interceptors.request.use(
    config => {
        // config.headers['JSESSIONID'] = 'node01642vtc885dzq3ym0lobanezl1.node0';
        const isGetMethod = config.method.toUpperCase() === 'GET';

        if (!isGetMethod) {
            const data = config.data || {};
            const isFormData = data instanceof FormData;

            if (!isFormData) {
                config.headers['content-type'] = 'application/json';
                config.data = JSON.stringify(data);
            }
        }

        config.paramsSerializer = params => {
            return stringify(params);
        };

        return config;
    },
    error => {
        console.error(error);
    }
);

service.interceptors.response.use(
    res => {
        const { code, message } = res.data;

        if (code && message) {
            console.log(message);
            throw new Error(message);
        }

        return res;
    },
    err => {
        const message = (err.response && err.response.data && err.response.data.message) || err.message;
        throw new Error(message);
    }
);

export default service;
