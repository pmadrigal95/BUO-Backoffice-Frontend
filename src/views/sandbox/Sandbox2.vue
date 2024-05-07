<script>
const PsychometricProfileViewComponent = () =>
    import('@/views/sandbox/components/PsychometricProfileViewComponent');

const StatisticalHomeCardsViewComponent = () =>
    import('@/views/sandbox/components/StatisticalHomeCardsViewComponent');

export default {
    name: 'Sandbox2',

    components: {
        PsychometricProfileViewComponent,
        StatisticalHomeCardsViewComponent,
    },

    computed: {
        statisticalList() {
            return [
                {
                    numericPercentage: '350',
                    title: 'Empleados',
                },
                {
                    color: 'greenB600',
                    direction: 'down',
                    numericPercentage: '37.5',
                    title: 'Paridad de Género',
                },
                {
                    color: 'greenB600',
                    description: '+5 vs el mes anterior',
                    direction: 'down',
                    numericPercentage: '3,5',
                    title: 'Antigüedad (años)',
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
                <PsychometricProfileViewComponent
                    imageURL="https://buo-resources.s3.us-east-2.amazonaws.com/hotcakes_simple/SimpleHotcakeCautivador.svg"
                />
            </v-col>
        </v-row>
    </div>
</template>
