import axios from '@services/axios';
import axiosApprovalRepair from 'axios';
import qs from 'qs';

/**
 * 审批工单
 * @param form
 * @returns {Promise<void>}
 */

export async function approvalRepair(form) {
    const res = await axiosApprovalRepair({
        url: '/api/operation/repair/approvalRepair',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        method: 'post',
        data: form,
        transformRequest: [
            function(data) {
                let ret = '';
                ret = qs.stringify(data);
                // 注释方法是不使用插件
                // for (let it in data) {
                //   // ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';
                //   ret += it + '=' + data[it] + '&';
                // }
                return ret;
            }
        ]
    });
    return res.data;
}

export async function getApprovalList(repairId) {
    const res = await axios({
        url: `/api/operation/approval/getApprovalList/${repairId}`
    });
    return res.data;
}

export async function handleRepair(form) {
    const res = await axiosApprovalRepair({
        url: '/api/operation/repair/handleRepair',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        method: 'post',
        data: form,
        transformRequest: [
            function(data) {
                let ret = '';
                ret = qs.stringify(data);
                return ret;
            }
        ]
    });
    return res.data;
}
