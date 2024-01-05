<script>
/**
 * Descripción: Pantalla  AscendingPersonalitiesChartComponent
 *
 * @displayName AscendingPersonalitiesChartComponent
 *
 */

const BasePieChartViewComponent = () =>
    import(
        '@/views/sandBox/components/dashboard/shared/pie/BasePieChartViewComponent'
    );

export default {
    name: 'AscendingPersonalitiesChartComponent',

    components: {
        BasePieChartViewComponent,
    },

    computed: {
        fake() {
            return {
                labels: [
                    'Amigable',
                    'Cautivadora',
                    'Audaz',
                    'Tenaz',
                    'Detallista',
                ],
                data: [4, 1, 1, 1, 2],
                colors: [
                    'Amigable',
                    'Cautivadora',
                    'Audaz',
                    'Tenaz',
                    'Detallista',
                ],
            };
        },
    },
};
</script>

<template>
    <BasePieChartViewComponent
        title="Personalidades con más ascensos"
        :chartData="fake"
        isPDA
        isPie
    />
</template>
