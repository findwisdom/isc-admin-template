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
        url: '/api/cases/getCasesList',
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
        url: '/api/cases/addCases',
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
        url: '/api/cases/updateCases',
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
        url: `/api/cases/deleteCases`,
        method: 'delete',
        params: {
            cases: id
        }
    });
    return res.data;
}

/** 获取解决防范列表
 *
 * @returns {Promise<*>}
 */

export async function getSolutionList() {
    const res = await axios({
        url: '/api/solution/getSolutionList',
        params: {
            pageSize: 100,
            pageNumber: 1
        }
    });
    return res.data;
}
