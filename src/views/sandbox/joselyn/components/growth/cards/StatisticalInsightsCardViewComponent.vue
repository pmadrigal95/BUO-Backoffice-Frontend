<script>
/**
 * Descripción: Pantalla Card que maneja la cantidad de columnas que necesite
 *
 * @displayName BaseCardFlexViewComponent
 *
 */

const BaseCardFlexViewComponent = () =>
    import(
        '@/views/sandbox/joselyn/components/shared/cards/BaseCardFlexViewComponent'
    );
export default {
    name: 'BaseCardFlexViewComponent',

    components: {
        BaseCardFlexViewComponent,
    },

    props: {
        width: {
            type: String,
            default: '100%',
        },

        height: {
            type: String,
            default: '100%',
        },

        directionContent: {
            type: String,
            default: 'flex-row',
        },

        justifyContent: {
            type: String,
            default: '',
        },

        alignContent: {
            type: String,
            default: 'align-center',
        },

        color: {
            type: String,
            default: 'aidBlue900',
        },

        title: {
            type: String,
            default: undefined,
        },

        styleTitle: {
            type: String,
            default: 'BUO-Paragraph-Large-SemiBold  white--text',
        },

        description: {
            type: String,
            default: undefined,
        },

        styleDescription: {
            type: String,
            default: 'BUO-Label-XSmall  white--text pt-4',
        },
    },
};
</script>

<template>
    <BaseCardFlexViewComponent
        alignContent="align-center"
        :width="width"
        :height="height"
    >
        <div slot="column" class="pl-4">
            <strong class="BUO-Paragraph-Large-SemiBold aidBlue900--text">{{
                title
            }}</strong>
            <p>
                {{ description }}
            </p>
        </div>
    </BaseCardFlexViewComponent>
</template>
