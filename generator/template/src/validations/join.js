'use strict';

import { required } from '../utils/validators';

export default () => {
    return {
        name: [
            { validator: required(), message: '岗位名称必填' },
            { max: 10, message: '不超过10个汉字', trigger: 'blur' }
        ],
        city: [{ validator: required(), message: '城市必填' }, { max: 8, message: '不超过8个汉字', trigger: 'blur' }],
        duty: [{ validator: required(), message: '岗位职责必填' }],
        qualification: [{ validator: required(), message: '任职资格必填' }],
        publishTime: [{ validator: required(), message: '发布时间必填' }]
    };
};
