import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import colors from '@/plugins/colors.js';

Vue.use(Vuetify);

import es from 'vuetify/es5/locale/es';

export default new Vuetify({
    lang: {
        locales: { es },
        current: 'es',
    },
    theme: {
        options: {
            customProperties: true,
        },
        themes: {
            light: {
                ...colors.light,
                ...colors.buo,
                ...colors.pdaSolids,
            },
            dark: {
                ...colors.dark,
                ...colors.buo,
                ...colors.pdaSolids,
            },
        },
    },
});
