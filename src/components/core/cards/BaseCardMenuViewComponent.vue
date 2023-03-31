<script>
/**
 * Descripción: Menu
 *
 * @displayName BaseCardMenuViewComponent
 */

export default {
    name: 'BaseCardMenuViewComponent',

    props: {
        to: {
            type: String,
            default: undefined,
        },

        icon: {
            type: String,
            default: undefined,
        },

        startIcon: {
            type: Boolean,
            default: false,
        },

        endIcon: {
            type: Boolean,
            default: false,
        },

        centerIcon: {
            type: Boolean,
            default: false,
        },

        iconColor: {
            type: String,
            default: 'blue900',
        },

        subtitle: {
            type: String,
            default: undefined,
        },

        positionSubtitle: {
            type: String,
            default: undefined,
        },

        description: {
            type: String,
            default: undefined,
        },

        positionDescription: {
            type: String,
            default: undefined,
        },

        bottonDisplay: {
            type: String,
            default: 'Ver más',
        },

        startBotton: {
            type: Boolean,
            default: false,
        },

        endBotton: {
            type: Boolean,
            default: false,
        },

        centerBotton: {
            type: Boolean,
            default: false,
        },

        position: {
            type: String,
            default: 'start',
        },

        imgSmall: {
            type: Boolean,
            default: false,
        },

        minWidth: {
            type: [String, Number],
            default: undefined,
        },

        minHeight: {
            type: [String, Number],
            default: undefined,
        },

        maxWidth: {
            type: [String, Number],
            default: undefined,
        },

        maxHeight: {
            type: [String, Number],
            default: undefined,
        },

        fontTypeSubtitle: {
            type: String,
            default: 'BUO-Paragraph-Small-SemiBold black--text',
        },

        fontTypeDescription: {
            type: String,
            default: 'BUO-Label-XSmall black--text',
        },

        large: {
            type: Boolean,
            default: false,
        },

        small: {
            type: Boolean,
            default: false,
        },

        xLarge: {
            type: Boolean,
            default: false,
        },

        xSmall: {
            type: Boolean,
            default: false,
        },

        btnRequired: {
            type: Boolean,
            default: true,
        },
    },

    computed: {
        positionJustify() {
            return this.menuItems.lenght > 1 ? 'center' : this.position;
        },
    },
};
</script>

<template>
    <v-hover v-slot="{ hover }" open-delay="200">
        <v-card
            flat
            outlined
            :elevation="hover ? 8 : 0"
            :class="{ 'on-hover': hover }"
            class="mx-2 rounded-lg"
            :min-width="minWidth"
            :max-width="maxWidth"
            :min-height="minHeight"
            :max-height="maxHeight"
            :to="to && { name: to }"
        >
            <v-card-title class="d-flex">
                <v-layout
                    :justify-center="centerIcon"
                    :justify-end="endIcon"
                    :justify-start="startIcon"
                >
                    <v-icon
                        :color="iconColor === undefined ? 'blue' : iconColor"
                        class="pb-2"
                        :small="small"
                        :large="large"
                        :x-large="xLarge"
                        :x-small="xSmall"
                        >{{ `mdi-${icon}` }}</v-icon
                    ></v-layout
                >
            </v-card-title>

            <v-card-subtitle
                :class="`${fontTypeSubtitle} d-flex ${positionSubtitle} flex-column buo-word-break`"
                >{{ subtitle }}</v-card-subtitle
            >

            <v-card-text
                :class="`${fontTypeDescription} d-flex ${positionDescription} flex-column buo-word-break`"
                >{{ description }}</v-card-text
            >

            <v-card-actions v-if="to != undefined">
                <v-layout
                    :justify-center="centerBotton"
                    :justify-end="endBotton"
                    :justify-start="startBotton"
                >
                    <v-btn
                        class="no-uppercase rounded-lg BUO-Label-XSmall-SemiBold lighten-2"
                        text
                        color="blue800"
                        :to="to && { name: to }"
                    >
                        <div v-if="btnRequired">
                            {{ bottonDisplay }}
                            <v-icon right>mdi-chevron-right</v-icon>
                        </div>
                    </v-btn>
                </v-layout>
            </v-card-actions>
        </v-card>
    </v-hover>
</template>
