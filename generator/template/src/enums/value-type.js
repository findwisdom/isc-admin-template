/**
 * value-type
 * @author ydr.me
 * @create 2019-08-16 10:52:09
 * @update 2019-08-16 10:52:09
 */

'use strict';

export const valueTypeMap = {
    DISCRETE: '离散型',
    LONG_INTEGER: '长整型',
    SIMULATE: '模拟型',
    STRING: '字符串型'
};
export const valueTypeOptions = Object.keys(valueTypeMap).map(key => {
    return {
        value: key,
        label: valueTypeMap[key]
    };
});
