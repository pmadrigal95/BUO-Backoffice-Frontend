<script>
/**
 * Descripción: Pantalla Sandbox 2
 *
 * @displayName Sandbox2ViewComponent
 *
 */

const InformativeCardViewComponent = () =>
    import(
        '@/views/sandbox/joselyn/components/growth/cards/InformativeCardViewComponent'
    );

const BaseCardFlexViewComponent = () =>
    import(
        '@/views/sandbox/joselyn/components/shared/cards/BaseCardFlexViewComponent'
    );

export default {
    name: 'Sandbox2ViewComponent',

    components: {
        BaseCardFlexViewComponent,
        InformativeCardViewComponent,
    },

    methods: {
        test() {
            alert('hola');
        },
    },
};
</script>

<template>
    <v-row>
        <v-col cols="12">
            <h2 class="mb-4">Ejemplos del base Card</h2>
            <BaseCardFlexViewComponent
                directionContent="flex-nowrap"
                justifyContent="justify-space-around"
                width="278px"
                height="192px"
            >
                <div slot="column" class="">columna 1</div>
            </BaseCardFlexViewComponent>
        </v-col>
        <v-col cols="12">
            <h2 class="mb-4">Card informativos</h2>
            <InformativeCardViewComponent
                width="357px"
                image="https://buo-resources.s3.us-east-2.amazonaws.com/dashboard/ai-icon.svg"
                description="De acuerdo a tu histórico de crecimiento y a tu data de
                entrenamientos, desde que implementaste el Entrenamiento 01 en
                Abril, tu crecimiento aumentó en un 15% por lo que recomendamos
                implementar más entrenamientos relacionados a capacidades de
                liderazgo"
            />
        </v-col>
        <v-col cols="12">
            <InformativeCardViewComponent
                width="357px"
                image="https://buo-resources.s3.us-east-2.amazonaws.com/dashboard/ai-icon.svg"
                description="De acuerdo a insights de rotación, el 
        Beneficio 3 es un gran motivador para tus colaboradores por lo que te recomendamos aumentar esfuerzos relacionados con este beneficio"
            />
        </v-col>
        <v-col cols="12">
            <InformativeCardViewComponent
                width="523px"
                image="https://buo-resources.s3.us-east-2.amazonaws.com/dashboard/ai-icon.svg"
                description="Tu Manager 1 nivel 2 cuenta con un porcentaje de crecimiento de 50% y dado que estás llevando un plan de sucesión de manager para nivel 1, te recomendamos considerar Manager 1 como candidato"
        /></v-col>
        <v-col cols="12">
            <BaseCardFlexViewComponent
                justifyContent="justify-center"
                alignContent="align-center"
                color="aidMint400"
                borderColor="aidMint500"
                width="357px"
                height="auto"
                icon="alert-circle"
                iconColor="aidBlue900"
            >
                <div slot="column">
                    <p class="BUO-Label-XSmall grey600--text px-4 pb-2">
                        Prueba con icono
                    </p>
                </div>
            </BaseCardFlexViewComponent>
        </v-col>
    </v-row>
</template>

<style scoped>
.w-50 {
    width: 50%;
}
</style>
