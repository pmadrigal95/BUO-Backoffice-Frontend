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

const BaseAdvFilterTemplateViewComponent = () =>
    import(
        '@/views/dashboard/components/shared/template/BaseAdvFilterTemplateViewComponent'
    );

const HomeDashboardViewComponent = () =>
    import(
        '@/views/dashboard/buoDashboard/sections/home/HomeDashboardViewComponent'
    );

const RotationDashboardViewComponent = () =>
    import(
        '@/views/dashboard/buoDashboard/sections/rotation/RotationDashboardViewComponent'
    );

const PerformanceDashboardViewComponent = () =>
    import(
        '@/views/dashboard/buoDashboard/sections/performance/PerformanceDashboardViewComponent'
    );

const GrowthDashboardViewComponent = () =>
    import(
        '@/views/dashboard/buoDashboard/sections/growth/GrowthDashboardViewComponent'
    );

const RecruitmentDashboardViewComponent = () =>
    import(
        '@/views/dashboard/buoDashboard/sections/recruitment/RecruitmentDashboardViewComponent'
    );

export default {
    name: 'BUODashboardViewComponent',

    components: {
        NotifierViewComponent,
        HomeDashboardViewComponent,
        RotationDashboardViewComponent,
        PerformanceDashboardViewComponent,
        GrowthDashboardViewComponent,
        RecruitmentDashboardViewComponent,
        BaseAdvFilterTemplateViewComponent,
    },

    data() {
        return {
            step: undefined,
            windowSize: {
                x: 0,
                y: 0,
            },
        };
    },

    computed: {
        ...mapGetters('dashboard', ['notifier']),
    },

    created() {
        this.clean_dashboard();
    },

    mounted() {
        this.onResize();
    },

    methods: {
        ...mapActions('dashboard', ['clean_dashboard']),

        onResize() {
            this.windowSize = { x: window.innerWidth, y: window.innerHeight };
        },
    },
};
</script>

<template>
    <v-container fluid v-resize="onResize">
        <NotifierViewComponent v-if="!notifier" />

        <section>
            <v-tabs v-model="step" left show-arrows height="34">
                <v-tabs-slider color="transparent"></v-tabs-slider>
                <v-tab
                    disabled
                    class="rounded-pill no-uppercase mr-3"
                    active-class="tab-active-blue"
                    ><p class="BUO-Label-Small pt-4">Home</p>
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
                    class="rounded-pill no-uppercase mr-3"
                    active-class="tab-active-blue"
                    ><p class="BUO-Label-Small pt-4">Reclutamiento</p>
                </v-tab>
            </v-tabs>

            <BaseAdvFilterTemplateViewComponent>
                <section slot="template">
                    <v-tabs-items v-model="step" class="mx-n2 transparent">
                        <v-tab-item>
                            <HomeDashboardViewComponent />
                        </v-tab-item>

                        <v-tab-item>
                            <RotationDashboardViewComponent
                                v-if="step == 1"
                                :innerWidth="windowSize.x"
                            />
                        </v-tab-item>

                        <v-tab-item>
                            <PerformanceDashboardViewComponent />
                        </v-tab-item>

                        <v-tab-item>
                            <GrowthDashboardViewComponent />
                        </v-tab-item>

                        <v-tab-item>
                            <RecruitmentDashboardViewComponent />
                        </v-tab-item>
                    </v-tabs-items>
                </section>
            </BaseAdvFilterTemplateViewComponent>
        </section>
    </v-container>
</template>
