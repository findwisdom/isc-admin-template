/**
 * com-check
 * @author ydr.me
 * @create 2019-08-15 16:08:35
 * @update 2019-08-15 16:08:35
 */

'use strict';

export const comCheckList = [
    ['NONE', '无校验'],
    ['ODD', '奇校验'],
    ['EVEN', '偶校验'],
    ['SYMBOL', '标志校验'],
    ['SPACE', '空格校验']
];
export const comCheckOptions = comCheckList.map(item => {
    return {
        value: item[0],
        label: item[1]
    };
});
