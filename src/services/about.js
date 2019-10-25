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
        url: '/api/partner/getPartnerList',
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
        url: '/api/partner/addPartner',
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
        url: '/api/partner/updatePartner',
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
        url: `/api/partner/deletePartner`,
        method: 'delete',
        params: {
            partner: id
        }
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
        url: '/api/career/getCareerList',
        params: {
            pageSize,
            pageNumber,
            name
        }
    });
    return res.data;
}

export async function getCareerByName(pageSize, pageNumber, name) {
    const res = await axios({
        url: '/api/career/getCareerByName',
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
        url: '/api/career/addCareer',
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
        url: '/api/career/updateCareer',
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
        url: `/api/career/deleteCareer`,
        method: 'delete',
        params: {
            career: id
        }
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
export async function getPatentList(pageSize, pageNumber, name, type) {
    const res = await axios({
        url: '/api/patent/getPatentList',
        params: {
            pageSize,
            pageNumber,
            name,
            type
        }
    });
    return res.data;
}

export async function getPatentByName(pageSize, pageNumber, name, type) {
    const res = await axios({
        url: '/api/patent/getPatentByName',
        params: {
            pageSize,
            pageNumber,
            name,
            type
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
        url: '/api/patent/addPatent',
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
        url: '/api/patent/updatePatent',
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
        url: `/api/patent/deletePatent`,
        method: 'delete',
        params: {
            patentId: id
        }
    });
    return res.data;
}

/** 获取公司列表
 *
 * @param pageSize
 * @param pageNumber
 * @param name
 * @returns {Promise<*>}
 */
export async function getCompanyList(pageSize, pageNumber, name) {
    const res = await axios({
        url: '/api/company/getCompanyList',
        params: {
            pageSize,
            pageNumber,
            name
        }
    });
    return res.data;
}

/** 添加公司
 *
 * @param form
 * @returns {Promise<*>}
 */

export async function createCompany(form) {
    const res = await axios({
        url: '/api/company/addCompany',
        method: 'post',
        data: form
    });
    return res.data;
}

/**
 * 更新公司
 * @param form
 * @returns {Promise<*>}
 */

export async function updateCompany(form) {
    const res = await axios({
        url: '/api/company/updateCompany',
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
export async function deleteCompany(id) {
    const res = await axios({
        url: `/api/company/deleteCompany`,
        method: 'delete',
        params: {
            company: id
        }
    });
    return res.data;
}
