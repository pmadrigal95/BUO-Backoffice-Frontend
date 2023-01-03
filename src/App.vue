<script>
/**
 * Descripción: Contenedor de la aplicación
 *
 * @displayName App
 */
import facebookSDK from '@/services/socialMedia/facebook-SDK.js';

const TheNotificationContainer = () =>
    import('@/components/core/alerts/TheNotificationContainer.vue');

export default {
    name: 'App',
    metaInfo: {
        title: 'BUO BackOffice',
        titleTemplate: '%s | BackOffice',
        htmlAttrs: { lang: 'en' },
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
            },
        ],
        script: [
            {
                src: facebookSDK.$_Script,
                async: true,
                defer: true,
            },
        ],
    },

    components: {
        TheNotificationContainer,
    },
};
</script>

<template>
    <v-app class="BUO">
        <TheNotificationContainer />
        <router-view />
    </v-app>
</template>
