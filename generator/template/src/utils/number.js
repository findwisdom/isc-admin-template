/**
 * number
 * @author ydr.me
 * @create 2019-08-15 13:40:31
 * @update 2019-08-15 13:40:31
 */

'use strict';

/**
 * 数字整数化，非数字重置为默认值
 * @param num
 * @param [dft=1]
 * @returns {number}
 */
export function parseInt(num, dft = 1) {
    num = Number.parseInt(num);

    if (Number.isNaN(num)) {
        num = dft;
    }

    return num;
}
