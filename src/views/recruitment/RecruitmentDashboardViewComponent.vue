<script>
/**
 * Descripción: Pantalla  RecruitmentDashboardViewComponent
 *
 * @displayName RecruitmentDashboardViewComponent
 *
 */

const ContainerViewComponent = () =>
    import('@/views/recruitment/sections/Dashboard/ContainerViewComponent');

export default {
    name: 'RecruitmentDashboardViewComponent',

    components: { ContainerViewComponent },
};
</script>

<template>
    <ContainerViewComponent />
</template>
