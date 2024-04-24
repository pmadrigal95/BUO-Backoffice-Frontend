<script>
/**
 * Descripción: componente header
 *
 * @displayName BaseHeaderMenu
 */

import { mapGetters } from 'vuex';

import baseDataVisualizationColorsHelper from '@/helpers/baseDataVisualizationColorsHelper';

export default {
    name: 'BaseHeaderMenu',

    props: {
        title: {
            type: String,
            required: true,
        },

        subtitle: {
            type: String,
            default: undefined,
        },

        userAvatar: {
            type: String,
            default: undefined,
        },

        color: {
            type: String,
            default: undefined,
        },
    },

    computed: {
        ...mapGetters('theme', ['app']),

        $_color() {
            return this.color
                ? this.color
                : baseDataVisualizationColorsHelper.$_randomColor().main;
        },
    },
};
</script>

<template>
    <v-list-item :two-line="subtitle != undefined" class="px-2">
        <v-list-item-avatar>
            <BaseSkeletonLoader v-if="!userAvatar" type="avatar" />
            <v-avatar :color="$_color" v-else-if="userAvatar">
                <span
                    class="white--text BUO-Paragraph-Medium-SemiBold"
                    v-if="userAvatar.length <= 2"
                    >{{ userAvatar }}</span
                >

                <v-img
                    v-else
                    contain
                    :src="`data:image/jpeg;base64,${userAvatar}`"
                    :lazy-src="`data:image/jpeg;base64,${userAvatar}`"
                    alt="photoUrl"
                >
                    <template v-slot:placeholder>
                        <v-row
                            class="fill-height ma-0"
                            align="center"
                            justify="center"
                        >
                            <v-progress-circular
                                indeterminate
                                color="grey lighten-5"
                            ></v-progress-circular>
                        </v-row>
                    </template>
                </v-img>
            </v-avatar>
        </v-list-item-avatar>

        <v-list-item-content>
            <v-list-item-title
                class="BUO-Paragraph-Medium-SemiBold"
                :class="[app ? 'white--text' : 'grey700--text']"
                >{{ title }}</v-list-item-title
            >
            <v-list-item-subtitle
                v-if="subtitle"
                class="BUO-Label-XSmall"
                :class="[app ? 'blueProgress600--text' : 'grey600--text']"
                >{{ subtitle }}</v-list-item-subtitle
            >
        </v-list-item-content>
        <!-- @slot Agregar Contenido -->
        <slot name="btn"></slot>
    </v-list-item>
</template>
