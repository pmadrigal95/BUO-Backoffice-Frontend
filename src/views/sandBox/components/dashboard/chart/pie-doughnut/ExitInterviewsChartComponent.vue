<script>
/**
 * Descripción: Pantalla  ExitInterviewsChartComponent
 *
 * @displayName ExitInterviewsChartComponent
 *
 */

const BasePieChartViewComponent = () =>
    import(
        '@/views/sandBox/components/dashboard/shared/pie/BasePieChartViewComponent'
    );

export default {
    name: 'ExitInterviewsChartComponent',

    components: { BasePieChartViewComponent },

    computed: {
        fake() {
            return {
                labels: [
                    'Remuneración económica',
                    'Balance trabajo-vida',
                    'Beneficios',
                    'Crecimiento profesional',
                    'Personas en Liderazgo',
                ],
                data: [456, 345, 89, 100, 179],
            };
        },
    },
};
</script>

<template>
    <BasePieChartViewComponent
        title="Entrevistas de salida"
        :chartData="fake"
    />
</template>
