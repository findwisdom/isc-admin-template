/**
 * save-mode
 * @author ydr.me
 * @create 2019-08-19 11:34:55
 * @update 2019-08-19 11:34:55
 */

'use strict';

export const saveModeMap = {
    NO: '不存储',
    TIMING: '定时存储',
    CHANGE_ABSOLUTE: '变化存储_绝对值',
    CHANGE_RATE: '变化存储_百分比'
};
export const saveModeOptions = Object.keys(saveModeMap).map(key => {
    return {
        value: key,
        label: saveModeMap[key]
    };
});
