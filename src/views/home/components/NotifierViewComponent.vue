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
                    >Bienvenido a Buo Backoffice</v-card-title
                >
                <v-card-text
                    class="BUO-Paragraph-Small"
                    :class="[app ? 'white--text' : 'grey700--text']"
                >
                    <section class="pb-4">
                        <p>Descubre la eficiencia con los atajos de teclado.</p>

                        <p>
                            ¿Quieres optimizar tu experiencia en nuestro sitio?
                            ¡Los atajos de teclado son la clave!
                        </p>

                        <p>
                            Los atajos de teclado son combinaciones de teclas
                            que te permiten navegar y realizar acciones de forma
                            rápida y sencilla. Aquí te explicamos cómo
                            funcionan:
                        </p>

                        <p>
                            <span class="BUO-Paragraph-Small-SemiBold"
                                >Navegación rápida:</span
                            >
                            Utiliza las teclas de flecha para desplazarte por
                            las páginas y los elementos del sitio. La tecla
                            Enter suele ser útil para confirmar selecciones.
                        </p>

                        <p>
                            <span class="BUO-Paragraph-Small-SemiBold"
                                >Acceso rápido a funciones:</span
                            >
                            Asignamos atajos de teclado a las funciones más
                            comunes de nuestro sitio para que puedas acceder a
                            ellas con un solo toque.
                        </p>

                        <p>
                            <span class="BUO-Paragraph-Small-SemiBold"
                                >Aprende los atajos básicos:</span
                            >
                            Aquí tienes algunos atajos básicos para empezar:
                        </p>
                        <ul class="mb-2 mt-n3">
                            <li class="my-1">
                                <span class="BUO-Paragraph-Small-SemiBold"
                                    >Ctrl + K: </span
                                >Abrir el command palette
                            </li>
                            <li class="my-1">
                                <span class="BUO-Paragraph-Small-SemiBold"
                                    >Ctrl + H: </span
                                >ir al Inicio
                            </li>
                            <li class="my-1">
                                <span class="BUO-Paragraph-Small-SemiBold"
                                    >Ctrl + D:
                                </span>
                                Cambiar el tema del sitio web
                            </li>
                            <li class="my-1">
                                Utiliza el
                                <span class="BUO-Paragraph-Small-SemiBold"
                                    >buscador del command palette
                                </span>
                                para acceder al módulo deseado
                            </li>
                        </ul>

                        <p>
                            Los atajos de teclado son una herramienta poderosa
                            para optimizar tu experiencia en nuestro sitio.
                            ¡Úsalos para aumentar tu productividad y disfrutar
                            al máximo de nuestra plataforma!
                        </p>

                        <p>
                            ¡Que disfrutes explorando buo backoffice con los
                            atajos de teclado!
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
