<script>
/**
 * Descripción: Pantalla Buo Dashboard
 *
 * @displayName BUODashboardViewComponent
 */

import { mapGetters } from 'vuex';

const NotifierViewComponent = () =>
    import(
        '@/views/dashboard/buoDashboard/sections/notifier/NotifierViewComponent'
    );

// const RotationDashboardViewComponent = () =>
//     import(
//         '@/views/dashboard/buoDashboard/sections/rotation/RotationDashboardViewComponent'
//     );

const GrowthDashboardViewComponent = () =>
    import(
        '@/views/dashboard/buoDashboard/sections/growth/GrowthDashboardViewComponent'
    );

export default {
    name: 'BUODashboardViewComponent',

    components: {
        NotifierViewComponent,
        // RotationDashboardViewComponent,
        GrowthDashboardViewComponent,
    },

    data() {
        return {
            step: 3,
            windowSize: {
                x: 0,
                y: 0,
            },
        };
    },

    computed: {
        ...mapGetters('dashboard', ['notifier']),
    },

    mounted() {
        this.onResize();
    },

    methods: {
        onResize() {
            this.windowSize = { x: window.innerWidth, y: window.innerHeight };
        },
    },
};
</script>

<template>
    <v-container fluid v-resize="onResize">
        <NotifierViewComponent v-if="!notifier" />

        <v-tabs v-model="step" left show-arrows height="34">
            <v-tabs-slider color="transparent"></v-tabs-slider>
            <v-tab
                disabled
                class="rounded-pill no-uppercase mr-3"
                active-class="tab-active-blue"
                ><p class="BUO-Label-Small pt-4">Inicio</p>
            </v-tab>
            <v-tab
                class="rounded-pill no-uppercase mr-3"
                active-class="tab-active-blue"
                ><p class="BUO-Label-Small pt-4">Rotación</p>
            </v-tab>
            <v-tab
                disabled
                class="rounded-pill no-uppercase mr-3"
                active-class="tab-active-blue"
                ><p class="BUO-Label-Small pt-4">Desempeño</p>
            </v-tab>
            <v-tab
                class="rounded-pill no-uppercase mr-3"
                active-class="tab-active-blue"
                ><p class="BUO-Label-Small pt-4">Crecimiento</p>
            </v-tab>
            <v-tab
                disabled
                class="rounded-pill no-uppercase mr-3"
                active-class="tab-active-blue"
            >
                <v-icon small> mdi mdi-plus </v-icon>
            </v-tab>
        </v-tabs>

        <v-tabs-items v-model="step" class="mx-n2 transparent">
            <v-tab-item>
                <!--<HomeDashboardViewComponent
                    :entity="entity"
                    :filter="$_filter"
                    :showFilter="showFilter"
                    :innerWidth="windowSize.x"
                />
                -->
            </v-tab-item>

            <v-tab-item>
                <!-- <RotationDashboardViewComponent
                    v-if="step == 1"
                    :entity="entity"
                    :filter="$_filter"
                    :showFilter="showFilter"
                    :innerWidth="windowSize.x"
                /> -->
            </v-tab-item>

            <v-tab-item> </v-tab-item>

            <v-tab-item>
                <GrowthDashboardViewComponent :innerWidth="windowSize.x" />
            </v-tab-item>

            <v-tab-item> </v-tab-item>
        </v-tabs-items>
    </v-container>
</template>
