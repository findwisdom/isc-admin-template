/**
 * donwload
 * @author ydr.me
 * @create 2019-08-16 19:22:58
 * @update 2019-08-16 19:22:58
 */

'use strict';

import { success } from '../utils/message';

/**
 * 下载
 * @param href
 */
export default href => {
    // console.log('download', `${location.origin}${href}`);
    const aEl = document.createElement('a');
    aEl.href = href;
    aEl.download = '';
    aEl.click();
    success('文件下载中，注意查看');
};
