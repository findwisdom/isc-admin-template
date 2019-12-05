/**
 * role
 * @author ydr.me
 * @create 2019-08-23 15:42:03
 * @update 2019-08-23 15:42:03
 */

'use strict';

import { required, email } from '../utils/validators';

export default () => {
    return {
        email: [
            { validator: required(), message: '请输入邮箱' },
            { validator: email(), message: '请输入正确邮箱格式' }
        ],
        password: [{ validator: required(), message: '请输入密码' }],
        name: [{ validator: required(), message: '请输入姓名' }, { max: 8, message: '不超过8个汉字', trigger: 'blur' }]
    };
};
