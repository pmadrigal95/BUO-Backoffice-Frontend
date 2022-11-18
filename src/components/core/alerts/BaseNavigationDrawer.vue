<script>
/**
 * Descripción: Pantalla BaseNavigationDrawer
 *
 * @displayName BaseNavigationDrawer
 */

export default {
    name: 'BaseNavigationDrawer',

    props: {
        // Clicking outside of the element or pressing esc key will not deactivate it.
        persistent: {
            type: Boolean,
            default: false,
        },

        // Sets the width for the component.
        width: {
            type: String || Number,
            default: '600',
        },
    },

    data() {
        return {
            dialog: false,
        };
    },

    methods: {
        $_openModal() {
            this.dialog = !this.dialog;
        },
    },
};
</script>

<template>
    <v-navigation-drawer
        v-model="dialog"
        floating
        fixed
        right
        temporary
        :width="width"
        class="rounded-l-xl"
    >
        <v-card max-height="100%" max-width="100%" flat class="rounded-b-0">
            <v-layout justify-end>
                <v-btn
                    v-if="!persistent"
                    class="no-uppercase rounded-lg"
                    text
                    color="blue800"
                    @click="$_openModal()"
                >
                    Cerrar
                </v-btn>
            </v-layout>

            <v-divider></v-divider>

            <v-card-text>
                <!-- @slot Use este slot para el contenido -->
                <slot name="Content"></slot>
            </v-card-text>
        </v-card>
    </v-navigation-drawer>
</template>
