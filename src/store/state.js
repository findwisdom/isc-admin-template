/**
 * state
 * @author ydr.me
 * @create 2019-09-17 16:55:25
 * @update 2019-09-17 16:55:25
 */

'use strict';

export default {
    // 用户登录令牌，暂时没有用到
    token: sessionStorage.getItem('token'),

    // 用户账户
    accountId: '0',
    accountName: '硬编码账户名',
    accountMobile: '188xxxxxxxx',
    accountRole: 'admin',

    // 园区信息
    // @todo
    projectId: 10,
    projectName: '【id=10】本地 store 硬编码园区',
    userLogin: {}
};
