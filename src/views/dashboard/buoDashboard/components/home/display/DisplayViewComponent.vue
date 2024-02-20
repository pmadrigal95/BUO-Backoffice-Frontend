<script>
/**
 * Descripción: Pantalla  DisplayViewComponent
 *
 * @displayName DisplayViewComponent
 *
 */
const HeaderViewComponent = () =>
    import('@/views/dashboard/components/shared/header/HeaderViewComponent');

const StatisticalHomeCardsViewComponent = () =>
    import(
        '@/views/dashboard/buoDashboard/components/home/card/StatisticalHomeCardsViewComponent'
    );

export default {
    name: 'DisplayViewComponent',

    components: {
        HeaderViewComponent,
        StatisticalHomeCardsViewComponent,
    },

    computed: {
        homeList() {
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
                    type: 'success',
                },
                {
                    percentage: '3 años',
                    description: '+5 vs el mes anterior',
                    title: 'Antiguedad promedio',
                    direction: 'up',
                    color: 'greenB900',
                    type: 'warning',
                },
            ];
        },

        ourPillars() {
            return [
                {
                    percentage: '8%',
                    description: '-3.5 vs el mes anterior',
                    title: 'Crecimiento promedio',
                    direction: 'down',
                    color: 'redError900',
                    type: 'info',
                },
                {
                    percentage: '11.5%',
                    description: '+5 vs el mes anterior',
                    title: 'Rotación promedio',
                    direction: 'up',
                    color: 'greenA900',
                },
                {
                    percentage: '3.8%',
                    description: '+3.5 vs el mes anterior',
                    title: 'Desempeño promedio',
                    direction: 'up',
                    color: 'greenA900',
                },
                {
                    percentage: '10.5%',
                    description: '+2.8 vs el mes anterior',
                    title: 'Reclutamiento promedio',
                    direction: 'up',
                    color: 'greenA900',
                },
            ];
        },
    },
};
</script>

<template>
    <section class="mx-4">
        <HeaderViewComponent title="Home" />
        <section class="mb-3">
            <StatisticalHomeCardsViewComponent
                :chartData="homeList"
                height="171"
                width="297"
            />
        </section>
        <section class="mt-8 mb-3">
            <span class="BUO-Heading-XSmall">Nuestros pilares</span>
        </section>
        <section class="mb-3">
            <StatisticalHomeCardsViewComponent
                :chartData="ourPillars"
                height="171"
                width="297"
            />
        </section>
        <v-row>
            <v-col cols="12"> Hola</v-col>

    
        </v-row>
    </section>
</template>
