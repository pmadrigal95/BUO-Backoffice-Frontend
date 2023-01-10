<script>
/**
 * Descripción: Componente Layout the la aplicación
 *
 * @displayName TheLayout
 */

import baseLocalHelper from '@/helpers/baseLocalHelper';

import { mapGetters, mapActions } from 'vuex';

const TheToolbar = () => import('@/layouts/app/TheToolbar');

const TheMenu = () => import('@/components/core/drawers/TheMenu');

const TheFooter = () => import('@/layouts/app/TheFooter');

export default {
    name: 'TheLayout',

    components: {
        TheToolbar,
        TheFooter,
        TheMenu,
    },

    data() {
        return {
            fab: false,
            lblSigout: baseLocalHelper.$_LabelBtnSigout,
            showItems: true,
            /**
             * Tamaño de la pantalla del dispositivo
             */
            windowSize: {
                x: 0,
                y: 0,
            },
        };
    },

    computed: {
        ...mapGetters('theme', ['app']),
    },

    mounted() {
        /**
         * Determinar que tipo de pantalla
         */
        this.onResize();
    },

    methods: {
        ...mapActions('navbar', ['changeConfigStatus']),

        onScroll(e) {
            if (typeof window === 'undefined') return;
            const top = window.pageYOffset || e.target.scrollTop || 0;
            this.fab = top > 20;
        },

        toTop() {
            this.$vuetify.goTo(0);
        },

        /**
         * Determinar que pantall
         */
        onResize() {
            this.windowSize = { x: window.innerWidth, y: window.innerHeight };

            this.windowSize.x > 551
                ? (this.showItems = true)
                : (this.showItems = false);
        },
    },
};
</script>

<template>
    <div id="app" v-resize="onResize">
        <TheMenu />

        <TheToolbar :show="showItems" />

        <!-- Sizes your content based upon application components -->
        <v-main>
            <!-- Provides the application the proper gutter -->
            <v-container fluid class="scroll-y">
                <slot name="RenderBody"></slot>
                <v-btn
                    v-scroll="onScroll"
                    v-show="fab"
                    fab
                    dark
                    fixed
                    bottom
                    right
                    :color="app ? 'greenC900' : 'blue900'"
                    @click="toTop"
                >
                    <v-icon>mdi-chevron-up</v-icon>
                </v-btn>
            </v-container>
        </v-main>
        <TheFooter />
    </div>
</template>
