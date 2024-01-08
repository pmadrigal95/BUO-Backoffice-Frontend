<script>
/**
 * Descripción: Pantalla  ManagersRotationChartComponent
 *
 * @displayName ManagersRotationChartComponent
 *
 */

const BasePieChartViewComponent = () =>
    import(
        '@/views/sandBox/components/dashboard/shared/pie/BasePieChartViewComponent'
    );

export default {
    name: 'ManagersRotationChartComponent',

    components: { BasePieChartViewComponent },

    computed: {
        fake() {
            return {
                labels: ['Manager 1', 'Manager 2', 'Manager 3'],
                data: [456, 345, 50],
            };
        },
    },
};
</script>

<template>
    <BasePieChartViewComponent
        title="Managers y su porcentaje de rotación"
        :chartData="fake"
    />
</template>
