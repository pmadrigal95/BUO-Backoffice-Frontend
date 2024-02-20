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

const RotationDashboardViewComponent = () =>
    import(
        '@/views/dashboard/buoDashboard/sections/rotation/RotationDashboardViewComponent'
    );

export default {
    name: 'BUODashboardViewComponent',

    components: {
        NotifierViewComponent,
        RotationDashboardViewComponent,
    },

    data() {
        return {
            step: 1,
            windowSize: {
                x: 0,
                y: 0,
            },
            entity: undefined,
        };
    },

    computed: {
        ...mapGetters('dashboard', ['notifier', 'filter', 'showFilter']),

        $_filter() {
            return {
                organizacionId: this.entity?.companyId,
                departamentoId: this.entity?.departmentId
                    ? this.entity?.departmentId
                    : 0,
                fecha: this.entity?.month
                    ? `${this.entity?.month}-01T00:00:00`
                    : undefined,
            };
        },
    },

    created() {
        this.$_setFilter();
    },

    mounted() {
        this.onResize();
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

        onResize() {
            this.windowSize = { x: window.innerWidth, y: window.innerHeight };
        },

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
                disabled
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
                <RotationDashboardViewComponent
                    :entity="entity"
                    :filter="$_filter"
                    :showFilter="showFilter"
                    :innerWidth="windowSize.x"
                />
            </v-tab-item>

            <v-tab-item> </v-tab-item>

            <v-tab-item> </v-tab-item>

            <v-tab-item> </v-tab-item>
        </v-tabs-items>
    </v-container>
</template>
