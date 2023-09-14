<script>
/**
 * Descripción: Pantalla  demographics
 *
 * @displayName BuoAssessmentsDemographicsViewComponent
 *
 */

const ContainerViewComponent = () =>
    import(
        '@/views/demographics/assessments/components/ContainerViewComponent'
    );

export default {
    name: 'BuoAssessmentsDemographicsViewComponent',

    components: {
        ContainerViewComponent,
    },
};
</script>

<template>
    <ContainerViewComponent />
</template>
