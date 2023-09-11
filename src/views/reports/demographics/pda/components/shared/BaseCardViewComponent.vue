<script>
/**
 * Descripción: Pantalla
 *
 * @displayName BaseCardViewComponent
 *
 */

import { mapGetters } from 'vuex';

export default {
    name: 'BaseCardViewComponent',

    props: {
        title: {
            type: String,
            default: undefined,
        },

        subtitle: {
            type: String,
            default: undefined,
        },
    },

    computed: {
        ...mapGetters('theme', ['app']),
    },
};
</script>

<template>
    <v-card flat width="100%" height="100%">
        <v-card-title
            v-if="title"
            class="buo-word-break BUO-Paragraph-Large-SemiBold"
            :class="[app ? 'white--text' : 'grey700--text']"
        >
            {{ title }}
        </v-card-title>
        <v-card-subtitle
            v-if="subtitle"
            class="buo-word-break BUO-Paragraph-small"
            :class="[app ? 'blueProgress600--text' : 'grey600--text']"
        >
            {{ subtitle }}
        </v-card-subtitle>
        <v-card-text>
            <slot name="body"></slot>
        </v-card-text>
    </v-card>
</template>
