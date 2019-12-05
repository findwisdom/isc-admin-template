/**
 * @author hem <hem@isyscore.com>
 * @description 后台管理接口.
 * */

'use strict';

import axios from 'axios';

const url = '/api/operation/repair/getTodoRepairByTitle';

/**
 * 获取工单类型列表
 * @param title
 * @param [pageNumber=1]
 * @param [pageSize=10]
 * @returns {Promise<any>}
 */
export async function getList(title, pageNumber = 1, pageSize = 10) {
    const res = await axios({
        url: `${url}`,
        params: {
            title,
            pageNumber,
            pageSize
        }
    });
    return res.data;
}

/**
 * 删除工单类型
 * @param id
 * @returns {Promise<null|any>}
 */
export async function remove(id) {
    const res = await axios({
        url: `${url}/${id}`,
        method: 'delete'
    });

    if (res.data === true) {
        return null;
    }

    throw new Error('删除失败');
}
