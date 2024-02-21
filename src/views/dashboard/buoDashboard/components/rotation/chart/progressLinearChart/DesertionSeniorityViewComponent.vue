<script>
/**
 * Descripción: Pantalla  DesertionSeniorityViewComponent
 *
 * @displayName DesertionSeniorityViewComponent
 *
 */

const ProgressLinearComponent = () =>
    import(
        '@/views/dashboard/components/shared/chart/progressLinearChart/ProgressLinearComponent'
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
        title="Antigüedad de deserción (años)"
        :list="chartData"
        color="darkGreen"
    />
</template>
