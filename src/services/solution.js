import axios from '@/services/axios';

/** 获取案例列表
 *
 * @param pageSize
 * @param pageNumber
 * @param name
 * @returns {Promise<*>}
 */
export async function getCaseList(pageSize, pageNumber, name) {
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

/** 新增案例
 *
 * @param form
 * @returns {Promise<*>}
 */

export async function createCase(form) {
    const res = await axios({
        url: '/api/operation/repair/createRepair',
        method: 'post',
        data: form
    });
    return res.data;
}

/**
 * 更新案例
 * @param form
 * @returns {Promise<*>}
 */

export async function updateCase(form) {
    const res = await axios({
        url: '/api/operation/business/updateBusiness',
        method: 'put',
        data: form
    });
    return res.data;
}

/** 删除案例
 *
 * @param id
 * @returns {Promise<*>}
 */
export async function deleteCase(id) {
    const res = await axios({
        url: `/api/operation/repair/deleteRepair/${id}`,
        method: 'delete'
    });
    return res.data;
}

/** 获取解决防范列表
 *
 * @returns {Promise<*>}
 */

export async function getSolutionList() {
    const res = await axios({
        url: '/api/operation/user/getUserList'
    });
    return res.data;
}
