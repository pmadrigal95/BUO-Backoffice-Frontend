<script>
/**
 * Descripción: Pantalla  DisplayViewComponent
 *
 * @displayName DisplayViewComponent
 *
 */

const StatisticalHomeCardsViewComponent = () =>
    import(
        '@/views/dashboard/buoDashboard/components/home/card/StatisticalHomeCardsViewComponent'
    );

export default {
    name: 'DisplayViewComponent',

    components: {
        StatisticalHomeCardsViewComponent,
    },

    computed: {
        cardList() {
            return [
                {
                    color: 'redError900',
                    percentage: '350',
                    title: 'Empleados',
                },
                {
                    percentage: '50%',
                    description: '+5 vs el mes anterior',
                    title: 'Paridad de género',
                    direction: 'up',
                    color: 'redError900',
                    type: 'error',
                },
                {
                    percentage: '40 años',
                    description: '+3.5 vs el mes anterior',
                    title: 'Edad promedio',
                    direction: 'up',
                    color: 'greenB900',
                },
                {
                    percentage: '3 años',
                    description: '+5 vs el mes anterior',
                    title: 'Antiguedad promedio',
                    direction: 'up',
                    color: 'greenB900',
                },
            ];
        },
    },
};
</script>

<template>
    <StatisticalHomeCardsViewComponent
        :chartData="cardList"
        height="171"
        width="297"
    />
</template>
