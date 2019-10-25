import Vue from 'vue';
import axios from '@/services/axios';

/**
 * 获取用户列表数据
 * @param pageSize
 * @param pageNumber
 * @returns {Promise<void>}
 */

export async function getUserList(pageSize, pageNumber, name) {
    const res = await axios({
        url: '/api/user/getUserList',
        params: {
            pageSize,
            pageNumber,
            name
        }
    });
    return res.data;
}

/** 新增用户
 *
 * @param form
 * @returns {Promise<*>}
 */

export async function createUser(form) {
    const res = await axios({
        url: '/api/user/addUser',
        method: 'post',
        data: form
    });
    return res.data;
}

/**
 * 更新用户
 * @param form
 * @returns {Promise<*>}
 */

export async function updateUser(form) {
    const res = await axios({
        url: '/api/user/updateUser',
        method: 'put',
        data: form
    });
    return res.data;
}

/** 删除用户
 *
 * @param id
 * @returns {Promise<*>}
 */
export async function deleteUser(id) {
    const res = await axios({
        url: `/api/user/deleteUser`,
        method: 'delete',
        params: {
            user: id
        }
    });
    return res.data;
}

export async function login(email, password) {
    const res = await axios({
        url: '/api/system/login',
        params: {
            email,
            password
        }
    });
    return res.data;
}

export async function loginOut() {
    Vue.$router.push({ path: '/login' });
    window.sessionStorage.removeItem('userInfo');
}
