<script>
/**
 * Descripción: Menu
 *
 * @displayName MenuCardComponent
 */

export default {
    name: 'MenuCardComponent',

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

        size: {
            type: String,
            default: 'small',
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
            default: '317px',
        },

        minHeight: {
            type: String,
            default: '258px',
        },

        fontTypeSubtitle: {
            type: String,
            default: 'BUO-Paragraph-Small-SemiBold Buo-Black',
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
            :min-height="minHeight"
            :to="{ name: to }"
        >
            <v-card-title
                ><v-icon
                    :color="iconColor === undefined ? 'blue' : iconColor"
                    class="pb-2"
                    :size="size"
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
                    class="no-uppercase rounded-lg BUO-Label-XSmall-SemiBold"
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
