'use strict';

import { required } from '../utils/validators';

export default () => {
    return {
        name: [
            { validator: required(), message: '产品名称必填' },
            { max: 20, message: '不超过20个汉字', trigger: 'blur' }
        ],
        picture: [{ validator: required(), message: '封面图必传' }],
        order: [{ validator: required(), message: '顺序必填' }],
        description: [
            { validator: required(), message: '产品介绍必填' },
            { max: 150, message: '不超过150个汉字', trigger: 'blur' }
        ],
        productTypeId: [{ validator: required(), message: '所属产品类型必选' }]
    };
};
