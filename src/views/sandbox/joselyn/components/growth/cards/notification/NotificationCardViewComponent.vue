<script>
/**
 * Descripción: Pantalla Card informativo
 *
 * @displayName InformativeCardViewComponent
 *
 */
const BaseCardFlexViewComponent = () =>
    import(
        '@/views/sandbox/joselyn/components/shared/cards/BaseCardFlexViewComponent'
    );

export default {
    name: 'InformativeCardViewComponent',

    components: {
        BaseCardFlexViewComponent,
    },

    props: {
        image: {
            type: String,
            default: undefined,
        },

        icon: {
            type: String,
            default: undefined,
        },

        iconColor: {
            type: String,
            default: undefined,
        },

        description: {
            type: String,
            default: undefined,
        },

        width: {
            type: String,
            default: undefined,
        },
    },
};
</script>
<template>
    <BaseCardFlexViewComponent
        justifyContent="justify-center"
        alignContent="align-center"
        color="aidMint400"
        borderColor="aidMint500"
        :width="width"
        height="auto"
        :image="image"
        :icon="icon"
        :iconColor="iconColor"
        backgroundImage="aidBlue900"
    >
        <div slot="column">
            <p class="BUO-Label-XSmall grey600--text px-4 pb-2">
                {{ description }}
            </p>
        </div>
    </BaseCardFlexViewComponent>
</template>
