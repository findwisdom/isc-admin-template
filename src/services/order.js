/**
 * alarm
 * @author ydr.me
 * @create 2019-08-19 17:25:43
 * @update 2019-08-19 17:25:43
 */

'use strict';

import axios from '@services/axios';

/**
 * 创建工单
 * @param form
 * @returns {Promise<void>}
 */

export async function createRepair(form) {
    const res = await axios({
        url: '/api/operation/repair/createRepair',
        method: 'post',
        data: form
    });
    return res.data;
}

/**
 * 保存工单
 * @param form
 * @returns {Promise<void>}
 */

export async function saveRepair(form) {
    const res = await axios({
        url: '/api/operation/repair/saveRepair',
        method: 'post',
        data: form
    });
    return res.data;
}

/**
 * 获取所有工单
 * @param pageSize
 * @param pageNumber
 * @returns {Promise<void>}
 */

export async function getAllRepair(pageSize, pageNumber, title) {
    const res = await axios({
        url: '/api/operation/repair/getAllRepair',
        params: {
            pageSize,
            pageNumber,
            title
        }
    });
    return res.data;
}

/**
 * 获取代办工单
 * @param pageSize
 * @param pageNumber
 * @returns {Promise<void>}
 */

export async function getTodoRepair(pageSize, pageNumber, title) {
    const res = await axios({
        url: '/api/operation/repair/getTodoRepair',
        params: {
            pageSize,
            pageNumber,
            title
        }
    });
    return res.data;
}

/**
 * 删除工单
 * @param repairId
 * @returns {Promise<void>}
 */

export async function deleteRepair(repairId) {
    const res = await axios({
        url: `/api/operation/repair/deleteRepair/${repairId}`,
        method: 'delete'
    });
    return res.data;
}

/**
 * 获取附件信息
 * @param repairId
 * @returns {Promise<void>}
 */

export async function getAttachmentList(repairId) {
    const res = await axios({
        url: `/api/operation/attachment/getAttachmentList/${repairId}`,
        method: 'post'
    });
    return res.data;
}

export function getOrderDetail() {
    return JSON.parse(window.sessionStorage.getItem('OrderDetailItem'));
}

export function setOrderDetail(item) {
    return window.sessionStorage.setItem('OrderDetailItem', JSON.stringify(item));
}
