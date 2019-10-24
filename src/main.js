import Vue from 'vue';
import lang from 'element-ui/lib/locale/lang/zh-CN';
import locale from 'element-ui/lib/locale';
import elements from '@/utils/elements';
import App from '@/App.vue';
import router from '@/router/index';
import store from '@/store/index';
import SvgIcon from '@/components/SvgIcon';
import 'normalize.css';
// import 'element-ui/lib/theme-chalk/index.css';
import '@/scss/common.scss';
import '@/scss/element-ui.scss';
import '@/scss/dialog-form.scss';
import '@/scss/table-actions.scss';
import '@/services/axios';

Vue.use(elements);
Vue.component('svg-icon', SvgIcon);
Vue.config.productionTip = false;
locale.use(lang);

const requireAll = requireContext => requireContext.keys().map(requireContext);
const req = require.context('./assets/svg', false, /\.svg$/);
requireAll(req);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
