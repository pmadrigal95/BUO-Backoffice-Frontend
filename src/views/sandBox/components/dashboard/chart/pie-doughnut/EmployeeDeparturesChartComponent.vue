<script>
/**
 * Descripción: Pantalla  EmployeeDeparturesChartComponent
 *
 * @displayName EmployeeDeparturesChartComponent
 *
 */

const BasePieChartViewComponent = () =>
    import(
        '@/views/sandBox/components/dashboard/shared/pie/BasePieChartViewComponent'
    );

export default {
    name: 'EmployeeDeparturesChartComponent',

    components: { BasePieChartViewComponent },

    computed: {
        fake() {
            return {
                // labels: [
                //     'Remuneración económica',
                //     'Balance trabajo-vida',
                //     'Beneficios',
                //     'Crecimiento profesional',
                //     'Personas en Liderazgo',
                // ],
                data: [456, 345, 89, 100, 179],
            };
        },
    },
};
</script>

<template>
    <BasePieChartViewComponent
        title="% y número de salidas de colaboradores"
        :chartData="fake"
        :showLegend="false"
        isPie
    />
</template>
