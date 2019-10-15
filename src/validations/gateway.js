/**
 * gateway
 * @author ydr.me
 * @create 2019-08-23 15:42:03
 * @update 2019-08-23 15:42:03
 */

'use strict';

import { required, minLength, key } from '../utils/validators';

export default () => {
    return {
        name: [{ validator: required(), message: '请输入业务类型名称' }],
        businessKey: [
            { validator: required(), message: '请输入唯一key' },
            { validator: key(), message: 'key只能包含小写英文字母与下划线' }
        ],
        handler: [{ validator: required(), message: '请选择业务处理角色' }],
        flowList: [{ validator: minLength(), limit: 0, message: '请至少新建一个业务节点' }]
    };
};
