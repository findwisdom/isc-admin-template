'use strict';

import { required } from '../utils/validators';

export default () => {
    return {
        name: [
            { validator: required(), message: '合作伙伴名称必传' },
            { max: 10, message: '不超过10个汉字', trigger: 'blur' }
        ],
        order: [{ validator: required(), message: '排序必填' }],
        picture: [{ validator: required(), message: '图片必传' }]
    };
};
