/**
 * @author hem <hem@isyscore.com>
 * @description 角色管理接口.
 * */

'use strict';

import axios from 'axios';

const url = '/api/operation/user';

/**
 * 获取用户列表
 * @param title
 * @param [pageNumber=1]
 * @param [pageSize=10]
 * @returns {Promise<any>}
 */
export async function getList(title, pageNumber = 1, pageSize = 10) {
    const res = await axios({
        url: `${url}/getUserList`,
        params: {
            title,
            pageNumber,
            pageSize
        }
    });
    return res.data;
}

/**
 * 获取角色列表
 * @returns {Promise<any>}
 */
export async function getRoles() {
    const res = await axios({
        url: `${url}/getRoles`
    });
    return res.data;
}

/**
 * 编辑用户角色
 * @param form
 * @returns {Promise<null|any>}
 */
export async function createUpdate(form) {
    const res = await axios({
        url: `${url}/createUpdate`,
        method: 'post',
        data: form
    });
    return res.data;
}
