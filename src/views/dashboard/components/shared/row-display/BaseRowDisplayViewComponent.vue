<script>
/**
 * Descripción: Pantalla  BaseRowDisplayViewComponent
 *
 * @displayName BaseRowDisplayViewComponent
 *
 */

import { mapGetters } from 'vuex';

export default {
    name: 'BaseRowDisplayViewComponent',

    props: {
        title: {
            type: String,
            required: true,
        },

        value: {
            type: [String, Number],
            default: undefined,
        },
    },

    computed: {
        ...mapGetters('theme', ['app']),
    },
};
</script>

<template>
    <v-layout
        justify-space-between
        align-end
        :class="[app ? 'white--text' : 'grey700--text']"
    >
        <section class="BUO-Label-Small">{{ title }}</section>
        <section
            class="BUO-Paragraph-Large-SemiBold"
            :class="[!value && 'grey400--text']"
        >
            {{ value ? value : 'N/A' }}
        </section>
    </v-layout>
</template>
