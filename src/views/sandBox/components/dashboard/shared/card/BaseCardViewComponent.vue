<script>
/**
 * Descripción: Pantalla  BaseCardViewComponent
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

        fnCallback: {
            type: Function,
            default: () => {},
        },
    },

    computed: {
        ...mapGetters('theme', ['app']),
    },
};
</script>

<template>
    <v-card flat class="rounded-lg">
        <v-card-title
            class="BUO-Label-Small-SemiBold"
            :class="[app ? 'white--text' : 'grey700--text']"
            v-if="title"
        >
            {{ title }}
            <v-layout justify-end>
                <v-btn
                    icon
                    :color="app ? 'clouds' : 'black'"
                    @click="fnCallback"
                >
                    <v-icon>mdi-arrow-expand</v-icon>
                </v-btn>
            </v-layout>
        </v-card-title>
        <v-card-subtitle
            class="BUO-Paragraph-Small pb-0"
            :class="[app ? 'white--text' : 'grey700--text']"
            v-if="subtitle"
        >
            {{ subtitle }}
        </v-card-subtitle>
        <v-card-text>
            <slot name="card-text"></slot>
        </v-card-text>
    </v-card>
</template>
