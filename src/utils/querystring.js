/**
 * querystring
 * @author ydr.me
 * @create 2019-08-19 17:39:24
 * @update 2019-08-19 17:39:24
 */

'use strict';

import { each } from './object';

const encode = function(entry) {
    if (entry === null || entry === undefined || typeof entry === 'object' || typeof entry === 'function') {
        return '';
    }

    return encodeURIComponent(entry);
};

/**
 * 序列化成查询字符串
 * @param object
 * @returns {string}
 */
export function stringify(object) {
    const list = [];
    const push = (key, val) => {
        key = encode(key);
        val = encode(val);
        list.push(`${key}=${val}`);
    };

    each(object, function(key, val) {
        if (Array.isArray(val)) {
            val.forEach(val => {
                push(key, val);
            });
        } else {
            push(key, val);
        }
    });
    return list.join('&');
}
