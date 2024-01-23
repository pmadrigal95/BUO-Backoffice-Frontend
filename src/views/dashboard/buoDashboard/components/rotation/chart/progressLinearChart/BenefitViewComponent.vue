<script>
/**
 * Descripción: Pantalla  BenefitViewComponent
 *
 * @displayName BenefitViewComponent
 *
 */

const ProgressLinearComponent = () =>
    import(
        '@/views/dashboard/buoDashboard/components/shared/chart/progressLinearChart/ProgressLinearComponent'
    );

export default {
    name: 'BenefitViewComponent',

    props: {
        chartData: {
            type: Array,
            required: true,
        },
    },

    components: { ProgressLinearComponent },
};
</script>

<template>
    <ProgressLinearComponent title="Beneficios" :list="chartData" />
</template>
