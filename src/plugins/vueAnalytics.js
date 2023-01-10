/**
 * Descripción: Registro de vue google analytics
 *
 * @displayName vueAnalytics.js
 */

import Vue from 'vue';
import router from '@/router';
import VueGtag from 'vue-gtag';

Vue.config.productionTip = false;

// Configuration VueAnalytics
Vue.use(
    VueGtag,
    {
        config: { id: process.env.VUE_APP_BUO_Analytics },
    },
    router
);
