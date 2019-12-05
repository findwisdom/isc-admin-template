'use strict';

import { required } from '../utils/validators';

export default () => {
    return {
        name: [{ validator: required(), message: '名称必填' }, { max: 15, message: '不超过15个汉字', trigger: 'blur' }],
        order: [{ validator: required(), message: '排序必填' }],
        picture: [{ validator: required(), message: '图片必传' }],
        obtainTime: [{ validator: required(), message: '获得时间必填' }],
        remark: [
            { validator: required(), message: '备注必填' },
            { max: 256, message: '不超过256个汉字', trigger: 'blur' }
        ]
    };
};
