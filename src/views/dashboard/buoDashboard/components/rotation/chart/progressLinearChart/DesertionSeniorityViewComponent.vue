<script>
/**
 * Descripción: Pantalla  DesertionSeniorityViewComponent
 *
 * @displayName DesertionSeniorityViewComponent
 *
 */

const ProgressLinearComponent = () =>
    import(
        '@/views/dashboard/buoDashboard/components/shared/chart/progressLinearChart/ProgressLinearComponent'
    );

export default {
    name: 'DesertionSeniorityViewComponent',

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
    <ProgressLinearComponent
        title="Antigüedad de deserción"
        :list="chartData"
    />
</template>
