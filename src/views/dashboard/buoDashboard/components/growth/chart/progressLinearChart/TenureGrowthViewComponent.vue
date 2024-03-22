<script>
/**
 * Descripción: Pantalla  TenureGrowthViewComponent
 *
 * @displayName TenureGrowthViewComponent
 *
 */

const ProgressLinearComponent = () =>
    import(
        '@/views/dashboard/components/shared/chart/progressLinearChart/ProgressLinearComponent'
    );

export default {
    name: 'TenureGrowthViewComponent',

    props: {
        chartData: {
            type: Array,
            required: true,
        },
    },

    components: {
        ProgressLinearComponent,
    },
};
</script>

<template>
    <ProgressLinearComponent
        title="Antigüedad (años)"
        :list="chartData"
        color="darkGreen"
    />
</template>
