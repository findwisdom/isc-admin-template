/**
 * mutations
 * @author ydr.me
 * @create 2019-09-17 16:56:59
 * @update 2019-09-17 16:56:59
 */

'use strict';

// import state from './state';

export default {
    setProject(state, { projectId, projectName }) {
        if (projectId) {
            state.projectId = projectId;
            state.projectName = projectName;
        } else {
            state.projectId = null;
            state.projectName = null;
        }
    },
    setUserLogin(state, userLogin) {
        state.userLogin = userLogin;
    },
    setAccountRole(state, accountRole) {
        state.accountRole = accountRole;
    }
};
