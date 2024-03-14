<script>
/**
 * Descripción: Pantalla  BaseBasicCardViewComponent
 *
 * @displayName BaseBasicCardViewComponent
 *
 */

import { mapGetters } from 'vuex';

export default {
    name: 'BaseBasicCardViewComponent',

    props: {
        title: {
            type: String,
            default: undefined,
        },

        subtitle: {
            type: String,
            default: undefined,
        },

        icon: {
            type: String,
            default: 'arrow-expand',
        },

        iconColor: {
            type: String,
            default: 'black',
        },

        showIcon: {
            type: Boolean,
            default: false,
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
    <v-card flat class="rounded-lg" height="100%" width="100%">
        <v-card-title
            class="BUO-Label-Small-SemiBold"
            :class="[app ? 'white--text' : 'grey700--text']"
            v-if="title"
        >
            {{ title }}
            <v-layout justify-end align-end>
                <slot name="top-actions"></slot>
                <v-btn
                    v-if="showIcon"
                    icon
                    :color="app ? 'clouds' : iconColor"
                    @click="fnCallback"
                >
                    <v-icon> mdi-{{ icon }}</v-icon>
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
