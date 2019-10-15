/**
 * role
 * @author ydr.me
 * @create 2019-08-23 15:42:03
 * @update 2019-08-23 15:42:03
 */

'use strict';

import { required } from '../utils/validators';

export default () => {
    return {
        name: [{ validator: required(), message: '请输入用户姓名' }],
        username: [{ validator: required(), message: '请输入用户账号' }],
        groupList: [{ validator: required(), message: '请输入所属角色' }]
    };
};
