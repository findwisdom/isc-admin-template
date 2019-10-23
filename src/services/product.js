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
        url: '/api/product/getProductList',
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
        url: '/api/product/addProduct',
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
        url: '/api/product/updateProduct',
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
        url: `/api/product/deleteProduct`,
        method: 'delete',
        params: {
            Product: id
        }
    });
    return res.data;
}

/** 获取产品类型
 *
 * @returns {Promise<*>}
 */

export async function getProductType() {
    const res = await axios({
        url: '/api/productType/getProductTypeList',
        params: {
            pageSize: 100,
            pageNumber: 1
        }
    });
    return res.data;
}
