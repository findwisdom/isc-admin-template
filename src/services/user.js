import axios from '@services/axios';
/**
 * 获取用户列表数据
 * @param pageSize
 * @param pageNumber
 * @returns {Promise<void>}
 */

export async function getUserList(pageSize, pageNumber, name) {
    const res = await axios({
        url: '/api/operation/user/getUserList',
        params: {
            pageSize,
            pageNumber,
            name
        }
    });
    return res.data;
}

export async function setUserRole(userId, roleKey) {
    const res = await axios({
        url: '/api/operation/user-role/setUserRole',
        params: {
            userId,
            roleKey
        }
    });
    return res.data;
}
