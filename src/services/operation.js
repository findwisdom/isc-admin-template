import axios from '@services/axios';

export async function getOperationList() {
    const res = await axios({
        url: '/api/operation/role/getList'
    });
    return res.data;
}

export async function createBusiness(form) {
    const res = await axios({
        url: '/api/operation/business/createBusiness',
        method: 'post',
        data: form
    });
    return res.data;
}

export async function updateBusiness(form) {
    const res = await axios({
        url: '/api/operation/business/updateBusiness',
        method: 'put',
        data: form
    });
    return res.data;
}

export async function getBusinessList() {
    const res = await axios({
        url: '/api/operation/business/getBusinessList'
    });
    return res.data;
}

export async function getBusinessListByPage(pageSize, pageNumber, name) {
    const res = await axios({
        url: '/api/operation/business/getBusinessListByPage',
        params: {
            pageSize,
            pageNumber,
            name
        }
    });
    return res.data;
}

/**
 * 查询工单业务流程
 * @param businessKey
 * @returns {Promise<void>}
 */
export async function getFlowListByBusinessKey(businessKey) {
    const res = await axios({
        url: '/api/operation/flow/getFlowListByBusinessKey',
        params: {
            businessKey
        }
    });
    return res.data;
}

/**
 * 删除工单业务类型
 * @param businessKey
 * @returns {Promise<void>}
 */

export async function deleteBusiness(businessKey) {
    const res = await axios({
        url: `/api/operation/business/deleteBusiness`,
        method: 'delete',
        params: {
            businessKey
        }
    });
    return res.data;
}
