'use strict';

import { required, email, phone } from '../utils/validators';

export default () => {
    return {
        city: [{ validator: required(), message: '城市必填' }, { max: 8, message: '不超过8个汉字', trigger: 'blur' }],
        name: [
            { validator: required(), message: '公司名称必填' },
            { max: 100, message: '不超过100个汉字', trigger: 'blur' }
        ],
        address: [
            { validator: required(), message: '公司地址必填' },
            { max: 100, message: '不超过100个汉字', trigger: 'blur' }
        ],
        email: [{ validator: required(), message: '邮箱必填' }, { validator: email(), message: '请输入正确邮箱格式' }],
        phone: [
            { validator: required(), message: '电话必填' },
            { validator: phone(), message: '请输入正确联系电话格式' }
        ],
        postCode: [{ max: 8, message: '不超过8个汉字' }]
    };
};
