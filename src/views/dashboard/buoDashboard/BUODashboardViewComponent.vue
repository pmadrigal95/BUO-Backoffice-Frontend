<script>
/**
 * Descripción: Pantalla Buo Dashboard
 *
 * @displayName BUODashboardViewComponent
 */

import { mapGetters, mapActions } from 'vuex';

const NotifierViewComponent = () =>
    import(
        '@/views/dashboard/buoDashboard/sections/notifier/NotifierViewComponent'
    );

const HeaderViewComponent = () =>
    import(
        '@/views/dashboard/buoDashboard/components/shared/header/HeaderViewComponent'
    );

const RotationDashboardViewComponent = () =>
    import(
        '@/views/dashboard/buoDashboard/sections/rotation/RotationDashboardViewComponent'
    );

export default {
    name: 'BUODashboardViewComponent',

    components: {
        HeaderViewComponent,
        NotifierViewComponent,
        RotationDashboardViewComponent,
    },

    data() {
        return {
            step: 1,
            entity: undefined,
        };
    },

    computed: {
        ...mapGetters('theme', ['app']),

        ...mapGetters('dashboard', ['notifier', 'filter']),
    },

    created() {
        this.$_setFilter();
    },

    watch: {
        entity: {
            handler(newFilter, oldFilter) {
                if (JSON.stringify(newFilter) !== JSON.stringify(oldFilter)) {
                    this.$_updateVuex(newFilter);
                }
            },
            immediate: true,
        },
    },

    methods: {
        ...mapActions('dashboard', ['filter_user']),

        $_setFilter() {
            this.entity = this.filter;
        },

        $_updateVuex(filter) {
            this.filter_user(filter);
        },
    },
};
</script>

<template>
    <v-container fluid>
        <NotifierViewComponent v-if="!notifier" />

        <HeaderViewComponent class="mb-8 mt-n6 ml-n4" />

        <v-tabs
            v-model="step"
            left
            show-arrows
            height="25"
            :color="app ? 'blueProgress600' : 'blue800'"
        >
            <v-tabs-slider color="transparent"></v-tabs-slider>
            <v-tab
                :class="`rounded-pill no-uppercase mr-3 ${
                    app
                        ? 'bg-blueProgress600 black--text BUO-Display-Large'
                        : 'bg-white grey600--text'
                }`"
                active-class="bg-blue900 white--text"
                ><p class="BUO-Label-Small pt-3">Inicio</p>
            </v-tab>
            <v-tab
                :class="`rounded-pill no-uppercase mr-3 ${
                    app
                        ? 'bg-blueProgress600 black--text BUO-Display-Large'
                        : 'bg-white grey600--text'
                }`"
                active-class="bg-blue900 white--text"
                ><p class="BUO-Label-Small pt-3">Rotación</p>
            </v-tab>
            <v-tab
                :class="`rounded-pill no-uppercase mr-3 ${
                    app
                        ? 'bg-blueProgress600 black--text'
                        : 'bg-white grey600--text'
                }`"
                active-class="bg-blue900 white--text"
                ><p class="BUO-Label-Small pt-3">Desempeño</p>
            </v-tab>
            <v-tab
                :class="`rounded-pill no-uppercase mr-3 ${
                    app
                        ? 'bg-blueProgress600 black--text'
                        : 'bg-white grey600--text'
                }`"
                active-class="bg-blue900 white--text"
                ><p class="BUO-Label-Small pt-3">Crecimiento</p>
            </v-tab>
            <v-tab
                :class="`rounded-pill no-uppercase mr-3 ${
                    app ? 'bg-blueProgress600' : 'bg-white'
                }`"
                active-class="bg-blue900 white--text"
            >
                <v-icon small> mdi mdi-plus </v-icon>
            </v-tab>
        </v-tabs>

        <v-tabs-items v-model="step" class="mx-n2 transparent">
            <v-tab-item>
                <span>Hola 0</span>
            </v-tab-item>

            <v-tab-item>
                <RotationDashboardViewComponent :filter="entity" />
            </v-tab-item>

            <v-tab-item>
                <span>Hola 2</span>
            </v-tab-item>

            <v-tab-item>
                <span>Hola 3</span>
            </v-tab-item>

            <v-tab-item>
                <span>Hola 4</span>
            </v-tab-item>
        </v-tabs-items>
    </v-container>
</template>

<style scoped>
.bg-white {
    background-color: #ffffff;
}

.bg-blue900 {
    background-color: #003f5e !important;
}

.bg-blueProgress600 {
    background-color: #b9c9dc;
}
</style>
