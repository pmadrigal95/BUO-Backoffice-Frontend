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

        ...mapGetters('shortcut', ['notifier']),
    },

    mounted() {
        this.$_open();
    },

    methods: {
        ...mapActions('shortcut', ['notifier_user']),

        $_open() {
            this.$refs['popUp'].$_openModal();
        },

        $_setLocalStorage() {
            this.notifier_user([
                baseConfigHelper.$_shortcutNotifier,
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
                    >Bienvenid@ a Buo</v-card-title
                >
                <v-card-text
                    class="BUO-Paragraph-Small"
                    :class="[app ? 'white--text' : 'grey700--text']"
                >
                    <section class="pb-4">
                        <p class="BUO-Paragraph-Small-SemiBold">
                            ¿Quieres optimizar tu experiencia en la plataforma?
                        </p>

                        <p class="mt-n4">
                            ¡Encuentra lo que necesitas con los atajos de
                            teclado!
                        </p>

                        <p>
                            Los atajos de teclado, son combinaciones de teclas
                            que te permiten navegar y realizar acciones de forma
                            rápida y sencilla. Aquí te explicamos cómo
                            aplicarlos:
                        </p>

                        <p class="BUO-Paragraph-Small-SemiBold">
                            Navegación rápida
                        </p>

                        <ul class="mb-2 mt-n3">
                            <li class="my-1">
                                Utiliza las teclas de flecha para desplazarte
                                por las páginas y los elementos de la
                                plataforma.
                            </li>
                            <li class="my-1">
                                La tecla
                                <span class="BUO-Paragraph-Small-SemiBold"
                                    >"Enter"</span
                                >
                                suele ser útil para confirmar selecciones.
                            </li>
                        </ul>

                        <p class="BUO-Paragraph-Small-SemiBold">
                            Acceso rápido a funciones
                        </p>

                        <ul class="mb-2 mt-n3">
                            <li class="my-1">
                                Asignamos atajos de teclado para las funciones
                                más comunes del Backoffice y para que puedas
                                acceder a ellas con tan solo un paso:
                            </li>
                        </ul>

                        <p class="mt-4">
                            <span class="BUO-Paragraph-Small-SemiBold"
                                >Ctrl + K: </span
                            >Abrir el command palette
                        </p>

                        <p class="mt-n4">
                            <span class="BUO-Paragraph-Small-SemiBold"
                                >Ctrl + H: </span
                            >ir al Inicio
                        </p>

                        <p class="mt-n4">
                            <span class="BUO-Paragraph-Small-SemiBold"
                                >Ctrl + D:
                            </span>
                            Cambiar el tema del sitio web
                        </p>

                        <p class="mt-n4">
                            Utiliza el
                            <span class="BUO-Paragraph-Small-SemiBold"
                                >buscador del command palette
                            </span>
                            para acceder al módulo deseado
                        </p>

                        <p>
                            Aprovecha los atajos de teclado, son una herramienta
                            poderosa para optimizar tu experiencia en la
                            plataforma. ¡Úsalos y aumenta tu productividad,
                            ahorra tu tiempo y disfruta al máximo de los
                            beneficios que Buo Backoffice tiene para ti!
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
