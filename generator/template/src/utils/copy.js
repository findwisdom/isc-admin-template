/**
 * copy
 * @author ydr.me
 * @create 2019-08-21 11:58:55
 * @update 2019-08-21 11:58:55
 */

'use strict';

const inputEl = document.createElement('input');
const style = inputEl.style;
style.visibility = 'visible';
style.position = 'absolute';
style.top = '-9999px';
style.left = '-9999px';
inputEl.tabIndex = -1;
document.body.appendChild(inputEl);

/**
 * 复制文本【必须由用户手动触发】
 * @param text
 * @returns {boolean}
 */
export default function(text) {
    inputEl.value = String(text);
    inputEl.select();
    inputEl.setSelectionRange(0, text.length);
    try {
        return document.execCommand('copy');
    } catch (err) {
        return false;
    }
}
