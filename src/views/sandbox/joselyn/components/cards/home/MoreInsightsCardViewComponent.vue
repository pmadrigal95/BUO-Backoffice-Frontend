<script>
/**
 * Descripción: Pantalla Card More Insights
 *
 * @displayName MoreInsightsCardViewComponent
 *
 */

const BaseCardFlexViewComponent = () =>
    import(
        '@/views/sandbox/joselyn/components/shared/cards/BaseCardFlexViewComponent'
    );

export default {
    name: 'MoreInsightsCardViewComponent',

    components: {
        BaseCardFlexViewComponent,
    },
};
</script>

<template>
    <BaseCardFlexViewComponent
        directionContent="flex-nowrap"
        justifyContent="justify-space-around"
        color="#79FFCC"
        width="278px"
        height="192px"
    >
        <div slot="column" class="absolute w-50">
            <span class="BUO-Label-Small-SemiBold grey700--text"
                >¿Quieres obtener más insights?</span
            >
            <p class="BUO-Label-Small grey700--text">
                Necesitamos más datos para ofrecerte mejores sugerencias.
            </p>
            <v-btn
                dark
                color="white"
                @click="test()"
                class="BUO-Label-XSmall no-uppercase blue900--text"
                >Empezar proceso</v-btn
            >
        </div>
        <div slot="column" class="">
            <v-img
                width="180px"
                height="192px"
                class=""
                src="https://buo-resources.s3.us-east-2.amazonaws.com/dashboard/more-insights.svg"
            ></v-img>
        </div>
    </BaseCardFlexViewComponent>
</template>
