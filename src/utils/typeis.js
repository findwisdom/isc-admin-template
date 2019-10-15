/**
 * typeis
 * @author ydr.me
 * @create 2019-08-21 12:06:52
 * @update 2019-08-21 12:06:52
 */

'use strict';

/**
 * 判断数据类型
 * @param any
 * @returns {string}
 */
export default function(any) {
    const udf = 'undefined';

    if (typeof any === udf) {
        return udf;
    }

    return Object.prototype.toString
        .call(any)
        .slice(8, -1)
        .toLowerCase();
}
