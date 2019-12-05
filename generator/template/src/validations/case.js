'use strict';

import { required } from '../utils/validators';

export default () => {
    return {
        name: [
            { validator: required(), message: '案例名称必传' },
            { max: 20, message: '不超过20个汉字', trigger: 'blur' }
        ],
        order: [{ validator: required(), message: '案例排序必填' }],
        picture: [{ validator: required(), message: '案例图片必传' }],
        description: [
            { validator: required(), message: '案例介绍必传' },
            { max: 150, message: '不超过150个汉字', trigger: 'blur' }
        ],
        solutionId: [{ validator: required(), message: '所属解决方案必选' }]
    };
};
