/**
 * validators
 * @author ydr.me
 * @create 2019-08-22 15:29:21
 * @update 2019-08-22 15:29:21
 */

'use strict';

import typeis from './typeis';
import { parseInt } from './number';

export const required = () => {
    return (rule, value, next) => {
        const validate = rule.enable ? rule.enable() : true;

        if (!validate) {
            return next();
        }

        if (value === undefined || value === null || value === '') {
            return next(new Error());
        }

        next();
    };
};

// export const maxLength = () => {
//     return (rule, value, next) => {
//         const validate = rule.enable ? rule.enable() : true;
//
//         if (!validate) {
//             return next();
//         }
//
//         if (value.length > rule.limit) {
//             return next(new Error());
//         }
//
//         next();
//     };
// };

export const minLength = () => {
    return (rule, value, next) => {
        const validate = rule.enable ? rule.enable() : true;

        if (!validate) {
            return next();
        }

        if (value.length < rule.limit) {
            return next(new Error());
        }

        next();
    };
};

export const min = () => {
    return (rule, value, next) => {
        const validate = rule.enable ? rule.enable() : true;

        if (!validate) {
            return next();
        }

        let limit = rule.limit || 0;

        if (typeis(limit) === 'function') {
            limit = limit();
        }

        value = parseInt(value, 0);
        limit = parseInt(limit, 0);

        if (value < limit) {
            return next(new Error());
        }

        next();
    };
};

export const key = () => {
    return (rule, value, next) => {
        const validate = rule.enable ? rule.enable() : true;

        if (!validate) {
            return next();
        }

        if (/^[a-z-_]+$/.test(value)) {
            return next();
        }

        next(new Error());
    };
};

export const max = () => {
    return (rule, value, next) => {
        const validate = rule.enable ? rule.enable() : true;

        if (!validate) {
            return next();
        }

        let limit = rule.limit || 0;

        if (typeis(limit) === 'function') {
            limit = limit();
        }

        value = parseInt(value, 0);
        limit = parseInt(limit, 0);

        if (value > limit) {
            return next(new Error());
        }

        next();
    };
};

export const ip = () => {
    return (rule, value, next) => {
        const validate = rule.enable ? rule.enable() : true;

        if (!value || !validate) {
            return next();
        }

        if (/^(\d+\.){3}\d+$/.test(value)) {
            return next();
        }

        next(new Error());
    };
};

export const url = () => {
    return (rule, value, next) => {
        const validate = rule.enable ? rule.enable() : true;

        if (!value || !validate) {
            return next();
        }

        if (/^https?:\/\//i.test(value)) {
            return next();
        }

        next(new Error());
    };
};

export const postal = () => {
    return (rule, value, next) => {
        const validate = rule.enable ? rule.enable() : true;

        if (!value || !validate) {
            return next();
        }

        if (/^[1-9][0-9]{5}$/.test(value)) {
            return next();
        }

        next(new Error());
    };
};

export const phone = () => {
    return (rule, value, next) => {
        const validate = rule.enable ? rule.enable() : true;

        if (!value || !validate) {
            return next();
        }

        if (/^[1][3,4,5,7,8][0-9]{9}$/.test(value) || /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(value)) {
            return next();
        }

        next(new Error());
    };
};

export const email = () => {
    return (rule, value, next) => {
        const validate = rule.enable ? rule.enable() : true;

        if (!value || !validate) {
            return next();
        }

        if (/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(value)) {
            return next();
        }

        next(new Error());
    };
};

export const format = () => {
    return function(rule, value, next) {
        const validate = rule.enable ? rule.enable() : true;

        if (!value || !validate) {
            return next();
        }

        let limit = rule.limit;
        let assigned = 0;

        if (typeis(limit) === 'function') {
            limit = limit();
        }

        if (typeis(limit) === 'array') {
            const limit2 = limit;
            limit = limit2[0];
            assigned = limit2[1];
        }

        const reg = new RegExp(`^-?\\d+(|\\.\\d{0,${assigned - 1}}[1-9])$`);

        switch (limit) {
            // 整数
            case 'integer':
                if (/^(-?[1-9]\d*|0)*$/.test(value)) {
                    return next();
                } else {
                    return next(new Error());
                }

            // 浮点数
            case 'float':
                if (/^-?([1-9]\d*|0)(\.\d*[1-9])?$/.test(value)) {
                    return next();
                } else {
                    return next(new Error());
                }

            // 小数位数
            case 'decimal':
                if (reg.test(value)) {
                    return next();
                } else {
                    return next(new Error());
                }

            case 'variable':
                if (/^[^\d][\s\x21-\x7e\u4E00-\u9FA5]*$/i.test(value)) {
                    //\x21-\x7e表示键盘上的各种符号，\u4E00-\u9FA5表示汉字
                    return next();
                } else {
                    //类似①这样的算特殊字符，下划线和汉字之类都不算
                    return next(new Error());
                }

            default:
                next();
        }
    };
};
