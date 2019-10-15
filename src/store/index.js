/**
 * index
 * @author ydr.me
 * @create 2019-09-17 16:57:55
 * @update 2019-09-17 16:57:55
 */

'use strict';

import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations';
import state from './state';
import getters from './getters';

Vue.use(Vuex);

export default new Vuex.Store({
    mutations,
    state,
    getters
});
