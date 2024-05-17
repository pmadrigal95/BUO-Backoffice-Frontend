<script>
/**
 * Descripción: Pantalla  VacantDashboardViewComponent
 *
 * @displayName VacantDashboardViewComponent
 *
 */

import { mapActions } from 'vuex';

const RecruitmentDashboardViewComponent = () =>
    import(
        '@/views/dashboard/recruitmentDashboard/RecruitmentDashboardViewComponent'
    );

export default {
    name: 'VacantDashboardViewComponent',

    props: {
        settings: {
            type: Object,
            requiered: true,
        },
    },

    components: { RecruitmentDashboardViewComponent },

    methods: {
        ...mapActions('dashboard', ['set_dashboard_by_id']),

        $_getToAPi() {
            this.set_dashboard_by_id('recruitment');
        },

        $_goBack() {
            this.$_getToAPi();
            delete this.settings.vacancyId;
            delete this.settings.vacancyName;
            this.settings.step = 0;
        },
    },
};
</script>

<template>
    <RecruitmentDashboardViewComponent
        v-if="settings && settings.vacancyId"
        :vacancyId="settings.vacancyId"
        :vacancyName="settings.vacancyName"
        :callback="$_goBack"
    />
    <BaseSkeletonLoader v-else type="card" />
</template>
