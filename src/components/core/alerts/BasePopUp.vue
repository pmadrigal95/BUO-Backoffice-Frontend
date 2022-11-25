<script>
/**
 * Descripción: Pantalla emergente
 *
 * @displayName BasePopUp
 */

import { v4 as uuidv4 } from 'uuid';

export default {
    name: 'BasePopUp',

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

        // Sets the width for the component.
        width: {
            type: [String, Number],
            default: undefined,
        },

        isDrawer: {
            type: Boolean,
            default: true,
        },
    },

    data() {
        return {
            /**
             * Identificador del Dialog
             */
            refpopUp: 'popUp_',
        };
    },

    created() {
        const randomID = uuidv4();

        /**
         * Config Inicial ID
         */
        this.refpopUp = this.refpopUp + randomID;
    },

    methods: {
        /**
         * Abrir modal
         */
        $_openModal() {
            this.$refs[this.refpopUp].$_openModal();
        },

        $_checkStatus() {
            return this.$refs[this.refpopUp].dialog;
        },
    },
};
</script>

<template>
    <div class="text-center">
        <BaseBottomSheet
            v-if="$vuetify.breakpoint.mobile"
            :ref="refpopUp"
            :close-delay="closeDelay"
            :dark="dark"
            :disabled="disabled"
            :eager="eager"
            :fullscreen="fullscreen"
            :hide-overlay="hideOverlay"
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
            :width="width"
        >
            <div slot="Content">
                <!-- @slot Use este slot para el contenido -->
                <slot name="Content"></slot>
            </div>
        </BaseBottomSheet>

        <BaseDialogNextGen
            v-if="!$vuetify.breakpoint.mobile && !isDrawer"
            :ref="refpopUp"
            :close-delay="closeDelay"
            :dark="dark"
            :disabled="disabled"
            :eager="eager"
            :fullscreen="fullscreen"
            :hide-overlay="hideOverlay"
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
            :width="width"
        >
            <div slot="Content">
                <!-- @slot Use este slot para el contenido -->
                <slot name="Content"></slot>
            </div>
        </BaseDialogNextGen>

        <BaseNavigationDrawer
            v-if="!$vuetify.breakpoint.mobile && isDrawer"
            :ref="refpopUp"
            :persistent="persistent"
            :width="width"
        >
            <div slot="Content">
                <!-- @slot Use este slot para el contenido -->
                <slot name="Content"></slot>
            </div>
        </BaseNavigationDrawer>
    </div>
</template>
