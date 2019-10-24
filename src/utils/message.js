/**
 * message
 * @author ydr.me
 * @create 2019-08-17 12:04:21
 * @update 2019-08-17 12:04:21
 */

'use strict';

import { Message, MessageBox, Loading } from 'element-ui';
import { assign } from './object';

const stringify = message => {
    return typeof message === 'object' ? message.message : String(message);
};

/**
 * 成功消息
 * @param message
 * @returns {ElMessageComponent}
 */
export const success = message => {
    return Message.success(stringify(message));
};

/**
 * 失败消息
 * @param message
 * @returns {ElMessageComponent}
 */
export const error = message => {
    message = stringify(message);
    if (message.toString().includes('系统异常')) {
        message = '系统异常';
    }
    return Message.error(stringify(message));
};

/**
 * 警告消息
 * @param message
 * @returns {ElMessageComponent}
 */
export const warning = message => {
    return Message.error(stringify(message));
};

/**
 * 提醒消息
 * @param message {String | Error}
 * @param [options]
 * @returns {Promise<MessageBoxData>}
 */
export const alertel = (message, options) => {
    message = stringify(message);
    // 专业的错误信息不暴露给用户
    if (message.toString().includes('系统异常')) {
        message = '系统异常';
    }
    options = assign(
        {
            title: '提醒',
            dangerouslyUseHTMLString: true,
            type: 'error'
        },
        options
    );
    return MessageBox.alert(message, options);
};

/**
 * 确认消息
 * @param message {String | Error}
 * @param [options]
 * @returns {Promise<MessageBoxData>}
 */
export const confirm = (message, options) => {
    message = stringify(message);
    options = assign(
        {
            title: '确认',
            dangerouslyUseHTMLString: true,
            type: 'warning'
        },
        options
    );
    return MessageBox.confirm(message, options);
};

/**
 * loading
 * @param [text="加载中"]
 * @returns {ElLoadingComponent}
 */
export const loading = (text = '加载中') => {
    return Loading.service({
        text
    });
};
