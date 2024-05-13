<script>
/**
 * Descripción: Pantalla  VacantDashboardViewComponent
 *
 * @displayName VacantDashboardViewComponent
 *
 */

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
        $_goBack() {
            delete this.settings.vacancyId;
            this.settings.step = 0;
        },
    },
};
</script>

<template>
    <RecruitmentDashboardViewComponent
        v-if="settings && settings.vacancyId"
        :vacancyId="settings.vacancyId"
        :callback="$_goBack"
    />
    <BaseSkeletonLoader v-else type="card" />
</template>
