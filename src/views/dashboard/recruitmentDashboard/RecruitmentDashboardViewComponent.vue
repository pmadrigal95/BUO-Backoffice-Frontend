<script>
/**
 * Descripción: Pantalla  RecruitmentDashboardViewComponent
 *
 * @displayName RecruitmentDashboardViewComponent
 *
 */

const ContainerViewComponent = () =>
    import(
        '@/views/dashboard/recruitmentDashboard/components/container/ContainerViewComponent'
    );

export default {
    name: 'VacantDashboardViewComponent',

    props: {
        vacancyId: {
            type: [Number, String],
            requiered: true,
        },

        vacancyName: {
            type: String,
            default: undefined,
        },

        callback: {
            type: Function,
            default: undefined,
        },
    },

    components: { ContainerViewComponent },
};
</script>

<template>
    <ContainerViewComponent
        v-if="vacancyId"
        :vacancyId="vacancyId"
        :vacancyName="vacancyName"
        :callback="callback"
    />
</template>
