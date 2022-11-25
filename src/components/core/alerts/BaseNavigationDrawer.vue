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
            type: [String, Number],
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
            <v-toolbar dense flat class="fixed-bar" v-if="!persistent">
                <v-spacer></v-spacer>
                <v-btn
                    class="no-uppercase rounded-lg"
                    text
                    color="blue800"
                    @click="$_openModal()"
                >
                    Cerrar
                </v-btn>
            </v-toolbar>
            <v-divider></v-divider>

            <v-card-text>
                <!-- @slot Use este slot para el contenido -->
                <slot name="Content"></slot>
            </v-card-text>
        </v-card>
    </v-navigation-drawer>
</template>

<style scoped>
.fixed-bar {
    position: sticky;
    position: -webkit-sticky; /* for Safari */
    top: 0;
    z-index: 2;
}
</style>
