<script>
/**
 * Descripción: Menu
 *
 * @displayName BaseCardMenu
 */

export default {
    name: 'BaseCardMenu',

    props: {
        to: {
            type: String,
            required: undefined,
        },

        icon: {
            type: String,
            required: undefined,
        },

        iconColor: {
            type: String,
            required: undefined,
        },

        subtitle: {
            type: String,
            required: undefined,
        },

        description: {
            type: String,
            required: undefined,
        },

        bottonDisplay: {
            type: String,
            required: undefined,
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
            type: String,
            default: undefined,
        },

        minHeight: {
            type: String,
            default: undefined,
        },

        maxWidth: {
            type: String,
            default: undefined,
        },

        maxHeight: {
            type: String,
            default: undefined,
        },

        fontTypeSubtitle: {
            type: String,
            default: 'BUO-Paragraph-Small-SemiBold Buo-Black',
        },

        size: {
            type: String,
            default: undefined,
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
            :to="{ name: to }"
        >
            <v-card-title
                ><v-icon
                    :color="iconColor === undefined ? 'blue' : iconColor"
                    class="pb-2"
                    :small="small"
                    :large="large"
                    :x-large="xLarge"
                    :x-small="xSmall"
                    >{{ `mdi-${icon}` }}</v-icon
                ></v-card-title
            >

            <v-card-subtitle :class="fontTypeSubtitle">{{
                subtitle
            }}</v-card-subtitle>

            <v-card-text class="BUO-Paragraph-Small">{{
                description
            }}</v-card-text>

            <v-card-actions>
                <v-btn
                    class="no-uppercase rounded-lg BUO-Label-XSmall-SemiBold lighten-2"
                    text
                    color="blue800"
                    v-if="bottonDisplay != undefined"
                >
                    {{ bottonDisplay }}
                    <v-icon right>mdi-chevron-right</v-icon>
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-hover>
</template>
