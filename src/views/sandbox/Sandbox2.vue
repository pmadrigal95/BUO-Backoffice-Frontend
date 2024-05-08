<script>
const PsychometricProfileViewComponent = () =>
    import('@/views/sandbox/components/PsychometricProfileViewComponent');

const StatisticalHomeCardsViewComponent = () =>
    import('@/views/sandbox/components/StatisticalHomeCardsViewComponent');
const BaseAIDrivenInsightsCardViewComponent = () =>
    import(
        '@/views/dashboard/components/shared/info/BaseAIDrivenInsightsCardViewComponent'
    );
export default {
    name: 'Sandbox2',

    components: {
        PsychometricProfileViewComponent,
        StatisticalHomeCardsViewComponent,
        BaseAIDrivenInsightsCardViewComponent,
    },

    computed: {
        statisticalList() {
            return [
                {
                    title: 'Empleados',
                    percentage: '350',
                },
                {
                    title: 'Paridad de Género',
                    type: 'error',
                    percentage: [
                        {
                            value: '53%',
                            description: 'Mujeres',
                        },
                        {
                            value: '47%',
                            description: 'Hombres',
                        },
                    ],
                },
                {
                    color: 'greenB600',
                    description: '+5 vs el mes anterior',
                    direction: 'down',
                    percentage: '3,5',
                    title: 'Antigüedad (años)',
                },
            ];
        },

        ourPillarsList() {
            return [
                {
                    color: 'redError900',
                    description: '-3.5 vs el mes anterior',
                    direction: 'down',
                    percentage: '8%',
                    title: 'Crecimiento promedio',
                    titleButton: 'Ver más',
                },
                {
                    color: 'greenA900',
                    description: '+5 vs el mes anterior',
                    direction: 'up',
                    percentage: '11.5%',
                    title: 'Rotación promedio',
                    titleButton: 'Ver más',
                },
                {
                    color: 'greenA900',
                    description: '+3.5 vs el mes anterior',
                    direction: 'up',
                    percentage: '3.8%',
                    title: 'Desempeño promedio',
                    titleButton: 'Ver más',
                },
                {
                    color: 'greenA900',
                    description: '+2.8 vs el mes anterior',
                    direction: 'up',
                    percentage: '10.5%',
                    title: 'Reclutamiento promedio',
                    titleButton: 'Ver más',
                },
            ];
        },
    },
};
</script>

<template>
    <div>
        <v-row>
            <v-col cols="12">
                <StatisticalHomeCardsViewComponent
                    :chartData="statisticalList"
                    height="171"
                    width="297"
                />
            </v-col>

            <v-col cols="12">
                <strong class="BUO-Heading-XSmall grey700--text"
                    >Nuestros Pilares</strong
                >
                <StatisticalHomeCardsViewComponent
                    :chartData="ourPillarsList"
                    height="171"
                    width="297"
                />
            </v-col>
            <v-col cols="12">
                <PsychometricProfileViewComponent
                    imageURL="https://buo-resources.s3.us-east-2.amazonaws.com/hotcakes_simple/SimpleHotcakeCautivador.svg"
                />
            </v-col>

            <v-col cols="12">
                <BaseAIDrivenInsightsCardViewComponent />
            </v-col>
        </v-row>
    </div>
</template>
