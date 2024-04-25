<script>
/**
 * Descripción: Pantalla Notificador
 *
 * @displayName NotifierViewComponent
 */

import { mapGetters, mapActions } from 'vuex';

import baseConfigHelper from '@/helpers/baseConfigHelper';

export default {
    name: 'NotifierViewComponent',

    computed: {
        ...mapGetters('theme', ['app']),

        ...mapGetters('dashboard', ['notifier']),
    },

    mounted() {
        this.$_open();
    },

    methods: {
        ...mapActions('dashboard', ['notifier_user']),

        $_open() {
            this.$refs['popUp'].$_openModal();
        },

        $_setLocalStorage() {
            this.notifier_user([
                baseConfigHelper.$_buoDashboardNotifier,
                !this.notifier,
            ]);
        },

        $_acceptTermsAndConditions() {
            this.$_setLocalStorage();
            this.$_open();
        },
    },
};
</script>

<template>
    <BasePopUp
        ref="popUp"
        :isDrawer="false"
        persistent
        :maxWidth="$vuetify.breakpoint.mobile ? '100%' : '600'"
        scrollable
    >
        <div slot="Content">
            <v-card flat height="100%" width="100%">
                <v-card-title
                    class="BUO-Heading-XSmall"
                    :class="[app ? 'blueProgress600--text' : 'blue900--text']"
                    >Bienvenid@ a Buo Dashboard</v-card-title
                >
                <v-card-text
                    class="BUO-Paragraph-Small"
                    :class="[app ? 'white--text' : 'grey700--text']"
                >
                    <section class="pb-4">
                        <p>
                            Para garantizar una experiencia visual óptima en
                            todos tus dispositivos, hemos diseñado
                            cuidadosamente los gráficos de manera responsiva.
                            Esto significa que la plataforma se adaptará de
                            forma inteligente a la resolución de la pantalla de
                            tu laptop, tablet y celular.
                        </p>

                        <p>
                            En tu
                            <span class="BUO-Paragraph-Small-SemiBold"
                                >laptop</span
                            >, disfruta de una presentación detallada y
                            expansiva, aprovechando al máximo el espacio
                            disponible.
                        </p>

                        <p>
                            En tu
                            <span class="BUO-Paragraph-Small-SemiBold"
                                >tablet</span
                            >, la presentación se ajustará de manera fluida para
                            ofrecer una experiencia táctil intuitiva y fácil de
                            navegar.
                        </p>

                        <p>
                            En tu
                            <span class="BUO-Paragraph-Small-SemiBold"
                                >celular</span
                            >, disfruta de una visualización clara y legible,
                            asegurando que la información sea accesible incluso
                            en pantallas más pequeñas.
                        </p>

                        <p>
                            Este enfoque, garantiza la máxima calidad visual en
                            todos tus dispositivos, proporcionando una
                            experiencia totalmente consistente y atractiva.
                        </p>
                    </section>
                </v-card-text>
                <v-card-actions>
                    <v-btn
                        class="no-uppercase rounded-lg BUO-Paragraph-Small-SemiBold"
                        elevation="0"
                        color="primary"
                        block
                        @click="$_acceptTermsAndConditions"
                        >Estoy de Acuerdo
                    </v-btn>
                </v-card-actions>
            </v-card>
        </div>
    </BasePopUp>
</template>
