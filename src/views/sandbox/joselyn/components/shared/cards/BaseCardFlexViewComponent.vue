<script>
/**
 * Descripción: Pantalla Card que maneja la cantidad de columnas que necesite
 *
 * @displayName BaseCardFlexViewComponent
 *
 */
export default {
    name: 'BaseCardFlexViewComponent',

    props: {
        width: {
            type: String,
            default: '100%',
        },

        height: {
            type: String,
            default: '100%',
        },

        paddingContent: {
            type: String,
            default: 'pa-0',
        },

        directionContent: {
            type: String,
            default: 'flex-row',
        },

        justifyContent: {
            type: String,
            default: 'justify-start',
        },

        alignContent: {
            type: String,
            default: 'align-center',
        },

        color: {
            type: String,
            default: '',
        },
    },
};
</script>

<template>
    <v-card
        flat
        class="rounded-lg"
        :height="height"
        :width="width"
        :color="color"
    >
        <v-card-text :class="paddingContent">
            <section
                class="d-flex"
                :class="`${directionContent} ${justifyContent} ${alignContent}`"
            >
                <slot name="column"></slot>
            </section>
        </v-card-text>
    </v-card>
</template>
