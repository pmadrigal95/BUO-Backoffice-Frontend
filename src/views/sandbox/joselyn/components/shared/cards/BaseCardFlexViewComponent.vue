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
            default: undefined,
        },

        borderColor: {
            type: String,
            default: undefined,
        },

        image: {
            type: String,
            default: undefined,
        },

        widthImage: {
            type: String,
            default: '17px',
        },

        heightImage: {
            type: String,
            default: '19px',
        },

        backgroundImage: {
            type: String,
            default: undefined,
        },

        widthBackgroundImage: {
            type: String,
            default: '49px',
        },

        heightBackgroundImage: {
            type: String,
            default: '39px',
        },

        icon: {
            type: String,
            default: undefined,
        },

        iconColor: {
            type: String,
            default: undefined,
        },
    },
};
</script>

<template>
    <v-sheet
        outlined
        :color="borderColor"
        rounded="lg"
        :height="height"
        :width="width"
    >
        <v-card
            outlined
            elevation="0"
            :color="color"
            :height="height"
            :width="width"
        >
            <v-card-text :class="paddingContent">
                <v-card
                    :color="backgroundImage"
                    :width="widthBackgroundImage"
                    :height="heightBackgroundImage"
                    class="d-flex justify-start align-center rounded-xxl"
                    style="
                        top: -20px;
                        left: 15px;
                        position: relative !important;
                    "
                    v-if="image"
                >
                    <v-card-text>
                        <v-img
                            contain
                            :width="widthImage"
                            :height="heightImage"
                            :src="image"
                            :lazy-src="image"
                        />
                    </v-card-text>
                </v-card>
                <v-icon
                    :color="iconColor"
                    large
                    v-else
                    style="
                        top: -20px;
                        left: 10px;
                        position: relative !important;
                    "
                >
                    {{ 'mdi-' + icon }}
                </v-icon>
                <section
                    class="d-flex"
                    :class="`${directionContent} ${justifyContent} ${alignContent}`"
                >
                    <slot name="column"></slot>
                </section> </v-card-text
        ></v-card>
    </v-sheet>
</template>

<style scoped>
.bg-test {
    border: 1px solid blue;
}

.opacity-30 {
    opacity: 0.3;
}
</style>
