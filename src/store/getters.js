/**
 * getters
 * @author hem
 * @create 2019-09-17 16:56:59
 * @update 2019-09-17 16:56:59
 */

'use strict';

export default {
    isAdmin(state) {
        return state.accountRole === 'admin';
    }
};
