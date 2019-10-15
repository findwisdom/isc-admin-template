import axios from '@services/axios';

export function redirect() {
    window.location.href = 'http://10.30.30.241:8091/qrcode?site=wo';
}

export async function login(form) {
    const res = await axios({
        url: '/api/operation/user/userLoginCallback',
        method: 'post',
        data: form
    });
    return res.data;
}

export async function loginOut() {
    const res = await axios({
        url: '/api/operation/user/exit',
        method: 'post'
    });
    return res.data;
}
