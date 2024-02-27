<script>
/**
 * Descripción: Pantalla Insights Estadísticos
 *
 * @displayName StatisticalInsightsViewComponent
 *
 */
const BaseCardFlexViewComponent = () =>
    import(
        '@/views/sandbox/joselyn/components/shared/cards/BaseCardFlexViewComponent'
    );

export default {
    name: 'StatisticalInsightsViewComponent',

    components: {
        BaseCardFlexViewComponent,
    },

    props: {
        image: {
            type: String,
            default: undefined,
        },

        width: {
            type: String,
            default: undefined,
        },

        height: {
            type: String,
            default: undefined,
        },
    },
};
</script>
<template>
    <BaseCardFlexViewComponent
        alignContent="align-center"
        color="aidMint500"
        :width="width"
        :height="height"
        :image="image"
        backgroundImage="aidBlue900"
        title="AI driven insights"
        widthBackgroundImage="185px"
    >
        <div slot="column" class="pl-4">
            <strong class="BUO-Paragraph-Large-SemiBold aidBlue900--text"
                >Insights estadísticos</strong
            >
        </div>
       
    </BaseCardFlexViewComponent>
</template>
