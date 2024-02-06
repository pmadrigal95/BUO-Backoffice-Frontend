<script>
/**
 * Descripción: Pantalla  RotationViewComponent
 *
 * @displayName RotationViewComponent
 *
 */

const ProgressLinearComponent = () =>
    import(
        '@/views/dashboard/components/shared/chart/progressLinearChart/ProgressLinearComponent'
    );

export default {
    name: 'RotationViewComponent',

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
        title="Puestos con mayor rotación"
        :list="chartData"
    />
</template>
