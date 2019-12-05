/**
 * register-read-write
 * @author ydr.me
 * @create 2019-08-19 09:59:22
 * @update 2019-08-19 09:59:22
 */

'use strict';

export const readWriteMap = {
    READ_WRITE_CHANGING: '读写（变化时写）',
    READ_ONLY: '只读（不允许写）',
    WRITE_ONLY_PERIOD: '只写（周期性写）',
    RW_CONSTANT: '读写（不变也写）',
    WRITE_ONLY_CHANGING: '只写（变化时写）',
    WRITE_ONLY_CONSTANT: '只写（不变也写）'
};
export const readWriteOptions = Object.keys(readWriteMap).map(key => {
    return {
        value: key,
        label: readWriteMap[key]
    };
});
