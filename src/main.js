import '@/plugins';
import Vue from 'vue';
import '@/css/buo.css';
import App from '@/App.vue';
import store from '@/store';
import router from '@/router';
import 'nprogress/nprogress.css';
import vuetify from '@/plugins/vuetify';
import baseLoadStore from '@/helpers/baseLoadStore';

new Vue({
    router,
    store,
    vuetify,
    created() {
        baseLoadStore.Initializer();
    },
    render: (h) => h(App),
}).$mount('#app');
