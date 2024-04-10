<script>
/**
 * Descripción: Pantalla  GrowthViewComponent
 *
 * @displayName GrowthViewComponent
 *
 */

const ProgressLinearComponent = () =>
    import(
        '@/views/dashboard/components/shared/chart/progressLinearChart/ProgressLinearComponent'
    );

export default {
    name: 'GrowthViewComponent',

    props: {
        chartData: {
            type: Array,
            required: true,
        },

        title: {
            type: String,
        },
    },

    components: { ProgressLinearComponent },
};
</script>

<template>
    <ProgressLinearComponent :title="title" :list="chartData" />
</template>
