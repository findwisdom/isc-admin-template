import axios from '@/services/axios';
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

/** 新增用户
 *
 * @param form
 * @returns {Promise<*>}
 */

export async function createUser(form) {
    const res = await axios({
        url: '/api/operation/repair/createRepair',
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
        url: '/api/operation/business/updateBusiness',
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
        url: `/api/operation/repair/deleteRepair/${id}`,
        method: 'delete'
    });
    return res.data;
}
