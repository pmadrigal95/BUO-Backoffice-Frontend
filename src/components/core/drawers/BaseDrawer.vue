<script>
/**
 * Descripción: componente menú lateral
 *
 * @displayName BaseDrawer
 */

import { mapGetters, mapActions } from 'vuex';

import baseConfigHelper from '@/helpers/baseConfigHelper';

const BaseHeaderMenu = () => import('@/components/core/drawers/BaseHeaderMenu');

export default {
    name: 'BaseDrawer',

    components: { BaseHeaderMenu },

    data() {
        return {
            mini: false,
            drawer: null,
            search: undefined,
            count: 0,
        };
    },

    computed: {
        /**
         * Nombre de Usuario
         */
        ...mapGetters('authentication', [
            'user',
            'userAvatar',
            'usernameDisplay',
        ]),

        ...mapGetters('navbar', ['status']),

        ...mapGetters('theme', ['app']),
    },

    created() {
        if (!this.userAvatar) {
            this.get_user_avatar(this.user.userId);
        }
    },

    watch: {
        status() {
            this.drawer = true;
        },

        '$vuetify.breakpoint.smAndDown'(value) {
            if (value) this.mini = false;
        },
    },

    methods: {
        ...mapActions('security', ['$_security_filter']),

        ...mapActions('authentication', ['get_user_avatar']),

        filter() {
            const time = baseConfigHelper.$_DefaultTimer;
            this.count++;

            /**
             * Ejecuta una petición, en determinado tiempo
             */
            if (this.count === 1) {
                setTimeout(() => {
                    this.$_security_filter(this.search);
                    this.count = 0;
                }, time);
            }
        },

        clean() {
            this.search = undefined;
            this.filter();
        },
    },
};
</script>

<template>
    <v-navigation-drawer
        app
        height="100%"
        v-model="drawer"
        :mini-variant.sync="mini"
        :permanent="$vuetify.breakpoint.mdAndUp"
        :absolute="$vuetify.breakpoint.mdAndUp"
        style="max-height: auto !important"
        :temporary="$vuetify.breakpoint.smAndDown"
    >
        <BaseHeaderMenu
            v-if="user && userAvatar"
            :title="usernameDisplay"
            :subtitle="user.email"
            :userAvatar="userAvatar"
        >
            <div slot="btn">
                <v-btn
                    icon
                    @click.stop="mini = !mini"
                    v-if="$vuetify.breakpoint.mdAndUp"
                >
                    <v-icon>mdi-chevron-left</v-icon>
                </v-btn>
            </div>
        </BaseHeaderMenu>

        <v-divider></v-divider>

        <section class="inputSearch" v-if="!mini">
            <BaseInput
                @keyup="filter"
                @click:clear="clean"
                placeholder="Buscar"
                dense
                rounded
                clearable
                v-model="search"
                prepend-inner-icon="mdi-magnify"
            />
        </section>

        <!-- @slot Agregar Contenido -->
        <slot name="container"></slot>
    </v-navigation-drawer>
</template>

<style>
.inputSearch {
    text-align: center;
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 15px;
    margin-bottom: -30px;
}
</style>
