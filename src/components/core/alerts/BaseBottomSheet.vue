<script>
/**
 * Descripción: Pantalla alternativa al BaseDialog
 *
 * @displayName BaseBottomSheet
 */

import { mapGetters } from 'vuex';

export default {
    name: 'BaseBottomSheet',

    props: {
        // Milliseconds to wait before closing component.
        closeDelay: {
            type: [Number, String],
            default: 0,
        },

        // Applies the dark theme variant to the component.
        dark: {
            type: Boolean,
            default: false,
        },

        // Disables the ability to open the component.
        disabled: {
            type: Boolean,
            default: false,
        },

        // Will force the components content to render on mounted.
        eager: {
            type: Boolean,
            default: false,
        },

        // 	Changes layout for fullscreen display.
        fullscreen: {
            type: Boolean,
            default: false,
        },

        //	Hides the display of the overlay.
        hideOverlay: {
            type: Boolean,
            default: false,
        },

        // 	Changes layout for fullscreen display.
        inset: {
            type: Boolean,
            default: false,
        },

        // 	Changes layout for fullscreen display.
        internalActivator: {
            type: Boolean,
            default: false,
        },

        // 	Applies the light theme variant to the component.
        light: {
            type: Boolean,
            default: false,
        },

        // Sets the maximum width for the component.
        maxWidth: {
            type: [String, Number],
            default: undefined,
        },

        // Disables the bounce effect when clicking outside of a v-dialog's content when using the persistent prop.
        noClickAnimation: {
            type: Boolean,
            default: false,
        },

        // 	Milliseconds to wait before opening component.
        openDelay: {
            type: [Number, String],
            default: 0,
        },

        openOnClick: {
            type: Boolean,
            default: true,
        },

        openOnFocus: {
            type: Boolean,
            default: false,
        },

        openOnHover: {
            type: Boolean,
            default: false,
        },

        // Sets the transition origin on the element.
        origin: {
            type: String,
            default: 'center center',
        },

        // Sets the overlay color.
        overlayColor: {
            type: String,
            default: undefined,
        },

        // Sets the overlay opacity.
        overlayOpacity: {
            type: [String, Number],
            default: undefined,
        },

        // Clicking outside of the element or pressing esc key will not deactivate it.
        persistent: {
            type: Boolean,
            default: false,
        },

        //Tab focus will return to the first child of the dialog by default. Disable this when using external tools that require focus such as TinyMCE or vue-clipboard.
        retainFocus: {
            type: Boolean,
            default: true,
        },

        // When set to true, expects a v-card and a v-card-text component with a designated height.
        scrollable: {
            type: Boolean,
            default: false,
        },

        //Sets the component transition.
        transition: {
            type: String,
            default: 'bottom-sheet-transition',
        },

        // Sets the width for the component.
        width: {
            type: [String, Number],
            default: undefined,
        },
    },

    data() {
        return {
            dialog: false,
        };
    },

    computed: { ...mapGetters('theme', ['app']) },

    methods: {
        $_openModal() {
            this.dialog = !this.dialog;
        },
    },
};
</script>

<template>
    <div class="text-center">
        <v-bottom-sheet
            v-model="dialog"
            :close-delay="closeDelay"
            :dark="dark"
            :disabled="disabled"
            :eager="eager"
            :fullscreen="fullscreen"
            :hide-overlay="hideOverlay"
            :inset="inset"
            :internal-activator="internalActivator"
            :light="light"
            :max-width="maxWidth"
            :no-click-animation="noClickAnimation"
            :open-delay="openDelay"
            :open-on-click="openOnClick"
            :open-on-focus="openOnFocus"
            :open-on-hover="openOnHover"
            :origin="origin"
            :overlay-color="overlayColor"
            :overlay-opacity="overlayOpacity"
            :persistent="persistent"
            :retain-focus="retainFocus"
            :scrollable="scrollable"
            :transition="transition"
            :width="width"
        >
            <v-card max-height="100%" max-width="100%" flat class="rounded-b-0">
                <v-toolbar dense flat class="fixed-bar" v-if="!persistent">
                    <v-spacer></v-spacer>
                    <v-btn
                        class="no-uppercase rounded-lg"
                        text
                        :color="app ? 'blueProgress600' : 'blue800'"
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
        </v-bottom-sheet>
    </div>
</template>

<style scoped>
.fixed-bar {
    position: sticky;
    position: -webkit-sticky; /* for Safari */
    top: 0;
    z-index: 2;
}
</style>
