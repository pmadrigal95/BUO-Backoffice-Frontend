<script>
/**
 * Descripción: Pantalla alternativa al BaseDialog, para acciones (add, edit, delete)
 *
 * @displayName BaseActionDialogNextGen
 */

import { v4 as uuidv4 } from 'uuid';

export default {
    name: 'BaseActionDialogNextGen',

    props: {
        action: {
            type: String,
            required: true,
        },

        icon: {
            type: String,
            default: undefined,
        },

        color: {
            type: String,
            default: undefined,
        },

        desc: {
            type: String,
            default: undefined,
        },

        fn: {
            type: Function,
            required: true,
        },

        item: {
            type: String,
            required: true,
        },

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

        //Sets the component transition.
        transition: {
            type: [String, Boolean],
            default: 'dialog-transition',
        },

        // Sets the width for the component.
        width: {
            type: [String, Number],
            default: '40%',
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

    computed: {
        $_Object() {
            let result;
            if (this.action === 'delete') {
                result = {
                    title: 'Eliminar',
                    icon: 'mdi-delete-outline',
                    color: 'redError900',
                    item: this.item,
                    desc: `¿Estás seguro que quieres eliminar esta ${this.item}? La información de tu indicador se perderá.`,
                };
            } else if (this.action === 'info') {
                result = {
                    title: 'Pendiente',
                    icon: 'mdi-information-outline',
                    color: 'blue900',
                    item: this.item,
                    desc: 'Pendiente',
                };
            } else if (this.action === 'success') {
                result = {
                    title: 'Pendiente',
                    icon: 'mdi-check-circle-outline',
                    color: 'greenA700',
                    item: this.item,
                    desc: 'Pendiente',
                };
            } else {
                result = {
                    title: this.action,
                    icon: this.icon,
                    color: this.color,
                    item: this.item,
                    desc: this.desc,
                };
            }
            return result;
        },
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
    },
};
</script>

<template>
    <div class="text-center">
        <BaseDialogNextGen
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
            :transition="transition"
            :width="width"
        >
            <div slot="Content">
                <v-card
                    max-height="100%"
                    max-width="100%"
                    flat
                    color="transparent"
                >
                    <v-layout justify-center>
                        <v-btn fab depressed icon :color="$_Object.color">
                            <v-icon x-large>{{ $_Object.icon }}</v-icon>
                        </v-btn>
                    </v-layout>

                    <v-card-title
                        :class="[
                            $vuetify.breakpoint.smAndDown
                                ? 'BUO-Heading-Small'
                                : 'BUO-Heading-Medium',
                        ]"
                    >
                        {{ $_Object.title + ' ' + $_Object.item }}
                    </v-card-title>

                    <v-card-text
                        v-if="$_Object.desc"
                        :class="[
                            $vuetify.breakpoint.smAndDown
                                ? 'BUO-Paragraph-Medium'
                                : 'BUO-Paragraph-Large',
                        ]"
                    >
                        {{ $_Object.desc }}
                    </v-card-text>

                    <v-card-actions>
                        <v-row>
                            <v-col cols="12">
                                <v-layout align-center justify-center>
                                    <!-- @slot Agregar botones después del Btn principal -->
                                    <slot name="Beforebtns"></slot>
                                    <v-btn
                                        :color="$_Object.color"
                                        dark
                                        block
                                        @click="fn"
                                        class="no-uppercase rounded-lg"
                                        >Si, {{ $_Object.title }}</v-btn
                                    >
                                </v-layout>
                            </v-col>
                            <v-col cols="12">
                                <v-layout align-center justify-center>
                                    <v-btn
                                        color="blue900"
                                        dark
                                        block
                                        outlined
                                        @click="$_openModal"
                                        class="no-uppercase rounded-lg"
                                        >Cancelar</v-btn
                                    >
                                    <!-- @slot Agregar botones después del Btn principal -->
                                    <slot name="btns"></slot>
                                </v-layout>
                            </v-col>
                        </v-row>
                    </v-card-actions>
                </v-card>
            </div>
        </BaseDialogNextGen>
    </div>
</template>
