/**
 * com-type
 * @author ydr.me
 * @create 2019-08-15 16:08:04
 * @update 2019-08-15 16:08:04
 */

'use strict';

export const comTypeList = ['485', '232', '422'];
export const comTypeOptions = comTypeList.map(item => {
    return {
        value: 'RS_' + item,
        label: 'RS-' + item
    };
});
