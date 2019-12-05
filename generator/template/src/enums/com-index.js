/**
 * com-index
 * @author ydr.me
 * @create 2019-08-15 16:04:52
 * @update 2019-08-15 16:04:52
 */

'use strict';

export const comIndexList = new Array(255);
export const comIndexWindowsOptions = comIndexList.fill(1).map((item, index) => ({
    value: index + 1,
    label: index + 1
}));
export const comIndexLinuxOptions = comIndexList.fill(1).map((item, index) => ({
    value: index,
    label: index
}));
