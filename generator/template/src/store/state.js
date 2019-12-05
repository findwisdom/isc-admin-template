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
    roles: []
};
