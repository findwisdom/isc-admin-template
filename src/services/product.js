import axios from '@/services/axios';

/**
 * 获取产品列表
 * @param pageSize
 * @param pageNumber
 * @param name
 * @returns {Promise<*>}
 */
export async function getProductList(pageSize, pageNumber, name) {
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

/**
 * 新增产品
 * @param form
 * @returns {Promise<*>}
 */

export async function createProduct(form) {
    const res = await axios({
        url: '/api/operation/repair/createRepair',
        method: 'post',
        data: form
    });
    return res.data;
}

/**
 * 更新产品
 * @param form
 * @returns {Promise<*>}
 */

export async function updateProduct(form) {
    const res = await axios({
        url: '/api/operation/business/updateBusiness',
        method: 'put',
        data: form
    });
    return res.data;
}

/** 删除产品
 *
 * @param id
 * @returns {Promise<*>}
 */
export async function deleteProduct(id) {
    const res = await axios({
        url: `/api/operation/repair/deleteRepair/${id}`,
        method: 'delete'
    });
    return res.data;
}

/** 获取产品类型
 *
 * @returns {Promise<*>}
 */

export async function getProductType() {
    const res = await axios({
        url: '/api/operation/user/getUserList'
    });
    return res.data;
}
