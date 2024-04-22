<script>
/**
 * Descripción: Pantalla  BaseStatusHeaderViewComponent
 *
 * @displayName BaseStatusHeaderViewComponent
 *
 */

import { mapGetters } from 'vuex';

export default {
    name: 'BaseStatusHeaderViewComponent',

    props: {
        title: {
            type: String,
            required: true,
        },

        type: {
            type: String,
            default: 'Success',
        },
    },

    computed: {
        ...mapGetters('theme', ['app']),

        $_status() {
            return this.type.toUpperCase() === 'Success'.toUpperCase()
                ? {
                      color: 'greenA800',
                      icon: 'checkbox-marked-circle',
                  }
                : {
                      color: 'redError900',
                      icon: 'close-circle',
                  };
        },
    },
};
</script>

<template>
    <v-list-item :class="[app ? 'white--text' : 'grey700--text']">
        <v-list-item-icon class="mr-3">
            <v-icon :color="$_status.color">{{
                `mdi-${$_status.icon}`
            }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
            <v-list-item-title class="BUO-Label-XSmall-SemiBold">{{
                title
            }}</v-list-item-title>
        </v-list-item-content>
    </v-list-item>
</template>
