/**
 * register-type
 * @author ydr.me
 * @create 2019-08-19 09:55:30
 * @update 2019-08-19 09:55:30
 */

'use strict';

export const registerTypeMap = {
    BIT: '位',
    BYTE_UNSIGNED: '字节无符号',
    BYTE_SIGNED: '字节有符号',
    SHORT_UNSIGNED: '短整型无符号',
    SHORT_SIGNED: '短整型有符号',
    LONG_UNSIGNED: '长整型无符号',
    LONG_SIGNED: '长整型有符号',
    FLOAT: '单精度浮点',
    DOUBLE: '双精度浮点',
    STRING: '字符串'
};
export const registerTypeLinkVariableMap = {
    DISCRETE: ['BIT'],
    LONG_INTEGER: ['BYTE_UNSIGNED', 'BYTE_SIGNED', 'SHORT_UNSIGNED', 'SHORT_SIGNED', 'LONG_UNSIGNED', 'LONG_SIGNED'],
    SIMULATE: ['FLOAT', 'DOUBLE'],
    STRING: ['STRING']
};
/*export const registerTypeOptions = Object.keys(registerTypeMap).map(key => {
    return {
        value: key,
        label: registerTypeMap[key]
    };
});*/
export const registerTypeLinkVariableOptions = variableType => {
    if (!variableType) {
        return [];
    }

    return registerTypeLinkVariableMap[variableType].map(item => {
        return {
            value: item,
            label: registerTypeMap[item]
        };
    });
};
