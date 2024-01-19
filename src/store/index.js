/**
 * Descripción: Gestor de Store Vuex
 *
 * @displayName index
 */

import Vue from 'vue';
import Vuex from 'vuex';
import appModule from '@/store/modules/app/appModule';
import backofficeModule from '@/store/modules/backoffice/backofficeModule';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        ...appModule,
        ...backofficeModule,
    },
});
