<script>
/**
 * Descripción: Pantalla Sandbox 2
 *
 * @displayName Sandbox2ViewComponent
 *
 */

const NotificationCardViewComponent = () =>
    import(
        '@/views/sandbox/joselyn/components/growth/cards/notification/NotificationCardViewComponent'
    );

const InsightsViewComponent = () =>
    import(
        '@/views/sandbox/joselyn/components/growth/cards/insights/InsightsViewComponent'
    );

const MoreInsightsCardViewComponent = () =>
    import(
        '@/views/sandbox/joselyn/components/growth/cards/insights/MoreInsightsCardViewComponent'
    );

const StatisticalCardsViewComponent = () =>
    import(
        '@/views/sandbox/joselyn/components/growth/cards/statistical/StatisticalCardsViewComponent'
    );

const InsightsHomeCardViewComponent = () =>
    import(
        '@/views/sandbox/joselyn/components/home/cards/InsightsViewComponent'
    );

const MoreInsightsHomeCardViewComponent = () =>
    import(
        '@/views/sandbox/joselyn/components/home/cards/MoreInsightsCardViewComponent'
    );

export default {
    name: 'Sandbox2ViewComponent',

    components: {
        InsightsViewComponent,
        InsightsHomeCardViewComponent,
        StatisticalCardsViewComponent,
        NotificationCardViewComponent,
        MoreInsightsCardViewComponent,
        MoreInsightsHomeCardViewComponent,
    },

    computed: {
        cardData() {
            return [
                {
                    title: 'Crecimiento',
                    description: '-3.5 vs el mes anterior',
                    color: 'redError900',
                    direction: 'up',
                    percentage: '8%',
                },
                {
                    title: 'Crecimiento promedio',
                    description: '+5 vs el mes anterior',
                    color: 'greenB900',
                    direction: 'down',
                    percentage: '11.5%',
                },
                {
                    title: 'Movimientos verticales',
                    description: '+3.5 vs el mes anterior',
                    color: 'greenB900',
                    direction: 'down',
                    percentage: '3.8%',
                },
                {
                    title: 'Movimientos horizontales',
                    description: '+2.8 vs el mes anterior',
                    percentage: '10.5%',
                    direction: 'down',
                    color: 'greenB900',
                },
            ];
        },

        insightsData() {
            return [
                {
                    title: 'Capacitación 1',
                    description:
                        'Los colaboradores que tienen la capacitación 1 completada han tenido el mayor crecimiento',
                },
                {
                    title: '4,6 personas',
                    description:
                        'Cada año fiscal, entre 4 y 6 personas crecen a posiciones verticales',
                },
                {
                    title: '2,3 personas',
                    description:
                        'Cada año fiscal, entre 2 y 3 personas crecen a posiciones horizontales',
                },
            ];
        },

        stadisticData() {
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
    },
};
</script>

<template>
    <v-row>
        <v-col cols="12">
            <StatisticalCardsViewComponent
                :chartData="cardData"
                height="171"
                width="278"
            />
        </v-col>

        <v-col cols="12">
            <h2 class="mb-4">AI driven insights</h2>
            <InsightsViewComponent
                :data="insightsData"
                width="100%"
                height="auto"
                image="https://buo-resources.s3.us-east-2.amazonaws.com/dashboard/ai-icon.svg"
            />
        </v-col>

        <v-col cols="12">
            <NotificationCardViewComponent
                width="357px"
                image="https://buo-resources.s3.us-east-2.amazonaws.com/dashboard/ai-icon.svg"
                description="De acuerdo a insights de rotación, el 
        Beneficio 3 es un gran motivador para tus colaboradores por lo que te recomendamos aumentar esfuerzos relacionados con este beneficio"
            />
        </v-col>

        <v-col cols="12">
            <NotificationCardViewComponent
                width="523px"
                image="https://buo-resources.s3.us-east-2.amazonaws.com/dashboard/ai-icon.svg"
                description="Tu Manager 1 nivel 2 cuenta con un porcentaje de crecimiento de 50% y dado que estás llevando un plan de sucesión de manager para nivel 1, te recomendamos considerar Manager 1 como candidato"
        /></v-col>

        <v-col cols="12">
            <NotificationCardViewComponent
                width="357px"
                icon="alert-circle"
                iconColor="aidBlue900"
                description="<p>De acuerdo a tu histórico de crecimiento y a tu data de entrenamientos, desde que implementaste el <strong class='grey700--text text-decoration-underline'>Entrenamiento 01</strong> en Abril, tu crecimiento aumentó en un 15% por lo que recomendamos implementar más entrenamientos relacionados a capacidades de liderazgo</p>"
            />
        </v-col>

        <v-col cols="12">
            <StatisticalCardsViewComponent
                :chartData="stadisticData"
                height="220px"
                width="278"
            />
        </v-col>

        <v-col cols="12">
            <MoreInsightsCardViewComponent
                title="¿Quieres obtener más insights?"
                subtitle="Necesitamos más datos para ofrecerte mejores sugerencias."
                nameButton="Empezar proceso"
            />
        </v-col>

        <v-col cols="12">
            <InsightsHomeCardViewComponent
                title="AI driven insights"
                subtitle="En BUO, nuestra tecnología AI provee indicadores cruciales
            para decisiones más informadas."
                description="Proporcionanos más datos y personalizaremos esta sección
            para ti."
                nameButton="Empezar proceso"
            />
        </v-col>

        <v-col cols="12">
            <MoreInsightsHomeCardViewComponent
                title="¿Quieres obtener más insights?"
                subtitle=" Necesitamos más datos para ofrecerte mejores sugerencias."
                nameButton="Empezar proceso"
            />
        </v-col>
    </v-row>
</template>
