/**
 * os-type
 * @author ydr.me
 * @create 2019-08-15 15:59:00
 * @update 2019-08-15 15:59:00
 */

'use strict';

export const osTypeList = [[1, 'Windows'], [2, 'Linux']];
export const osTypeOptions = osTypeList.map(item => {
    return {
        value: item[0],
        label: item[1]
    };
});
export const osTypeMap = osTypeList.reduce((prev, curr) => {
    prev[curr[0]] = curr[1];
    return prev;
}, {});
