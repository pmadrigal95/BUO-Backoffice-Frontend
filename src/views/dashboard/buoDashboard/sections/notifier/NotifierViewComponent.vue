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
                    >Bienvenido a Buo Dashboard</v-card-title
                >
                <v-card-text
                    class="BUO-Paragraph-Small"
                    :class="[app ? 'white--text' : 'grey700--text']"
                >
                    <!--TODO: Poner bonito-->
                    <section class="pb-4">
                        <p>
                            Para garantizar una experiencia visual óptima en
                            todos sus dispositivos, hemos diseñado
                            cuidadosamente los gráficos de manera responsiva.
                            Esto significa que los gráficos se adaptarán de
                            forma inteligente a la resolución de la pantalla de
                            su laptop, tablet y celular.
                        </p>

                        <p>
                            En su
                            <span class="BUO-Paragraph-Small-SemiBold"
                                >laptop</span
                            >, disfrutará de una presentación detallada y
                            expansiva, aprovechando al máximo el espacio
                            disponible.
                        </p>

                        <p>
                            En una
                            <span class="BUO-Paragraph-Small-SemiBold"
                                >tablet</span
                            >, la visualización se ajustará de manera fluida
                            para ofrecer una experiencia táctil intuitiva y
                            fácil de navegar.
                        </p>

                        <p>
                            Por último, en su
                            <span class="BUO-Paragraph-Small-SemiBold"
                                >celular</span
                            >, los gráficos se optimizarán para una
                            visualización clara y legible, asegurando que la
                            información es fácilmente accesible incluso en
                            pantallas más pequeñas.
                        </p>

                        <p>
                            Este enfoque garantiza coherencia y calidad visual
                            en todos sus dispositivos, proporcionando una
                            experiencia de usuario consistente y atractiva.
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
                        >Entendido
                    </v-btn>
                </v-card-actions>
            </v-card>
        </div>
    </BasePopUp>
</template>
