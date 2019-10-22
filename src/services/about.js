import axios from '@/services/axios';

/** 获取合作伙伴列表
 *
 * @param pageSize
 * @param pageNumber
 * @param name
 * @returns {Promise<*>}
 */
export async function getPartnerList(pageSize, pageNumber, name) {
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

/** 新增伙伴
 *
 * @param form
 * @returns {Promise<*>}
 */

export async function createPartner(form) {
    const res = await axios({
        url: '/api/operation/repair/createRepair',
        method: 'post',
        data: form
    });
    return res.data;
}

/**
 * 更新伙伴
 * @param form
 * @returns {Promise<*>}
 */

export async function updatePartner(form) {
    const res = await axios({
        url: '/api/operation/business/updateBusiness',
        method: 'put',
        data: form
    });
    return res.data;
}

/** 删除伙伴
 *
 * @param id
 * @returns {Promise<*>}
 */
export async function deletePartner(id) {
    const res = await axios({
        url: `/api/operation/repair/deleteRepair/${id}`,
        method: 'delete'
    });
    return res.data;
}

/** 获取岗位列表
 *
 * @param pageSize
 * @param pageNumber
 * @param name
 * @returns {Promise<*>}
 */
export async function getCareerList(pageSize, pageNumber, name) {
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

/** 新增岗位
 *
 * @param form
 * @returns {Promise<*>}
 */

export async function createCareer(form) {
    const res = await axios({
        url: '/api/operation/repair/createRepair',
        method: 'post',
        data: form
    });
    return res.data;
}

/**
 * 更新岗位
 * @param form
 * @returns {Promise<*>}
 */

export async function updateCareer(form) {
    const res = await axios({
        url: '/api/operation/business/updateBusiness',
        method: 'put',
        data: form
    });
    return res.data;
}

/** 删除岗位
 *
 * @param id
 * @returns {Promise<*>}
 */
export async function deleteCareer(id) {
    const res = await axios({
        url: `/api/operation/repair/deleteRepair/${id}`,
        method: 'delete'
    });
    return res.data;
}

/** 获取专利名称列表
 *
 * @param pageSize
 * @param pageNumber
 * @param name
 * @returns {Promise<*>}
 */
export async function getPatentList(pageSize, pageNumber, name) {
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

/** 新增专利名称
 *
 * @param form
 * @returns {Promise<*>}
 */

export async function createPatent(form) {
    const res = await axios({
        url: '/api/operation/repair/createRepair',
        method: 'post',
        data: form
    });
    return res.data;
}

/**
 * 更新专利名称
 * @param form
 * @returns {Promise<*>}
 */

export async function updatePatent(form) {
    const res = await axios({
        url: '/api/operation/business/updateBusiness',
        method: 'put',
        data: form
    });
    return res.data;
}

/** 删除专利名称
 *
 * @param id
 * @returns {Promise<*>}
 */
export async function deletePatent(id) {
    const res = await axios({
        url: `/api/operation/repair/deleteRepair/${id}`,
        method: 'delete'
    });
    return res.data;
}
