/**
 * device-type
 * @author ydr.me
 * @create 2019-08-16 10:59:43
 * @update 2019-08-16 10:59:43
 */

'use strict';

export const deviceTypeMap = {
    MEMORY_DEVICE: '内存设备',
    NETWORK_DEVICE: '网络设备',
    COMMON_DEVICE: '普通设备'
};
// 内置的设备类型
export const deviceTypeBuiltIn = {
    MEMORY_DEVICE: true,
    NETWORK_DEVICE: true
};
// 只能变量链接的设备类型
export const deviceTypeVariableLink = {
    COMMON_DEVICE: true,
    MEMORY_DEVICE: true
};
