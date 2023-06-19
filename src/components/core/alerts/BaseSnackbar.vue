<script>
/**
 * Descripción: Componente notificación emergente
 *
 * @displayName BaseSnackbar
 */

export default {
    name: 'BaseSnackbar',

    props: {
        /**
         * Applies position: absolute to the component.
         */
        absolute: {
            type: Boolean,
            default: false,
        },

        /**
         * Respects boundaries of—and will not overlap with—other app components like v-app-bar, v-navigation-drawer, and v-footer.
         */
        app: {
            type: Boolean,
            default: false,
        },

        /**
         * Aligns the component towards the bottom.
         */
        bottom: {
            type: Boolean,
            default: false,
        },

        /**
         * Positions the snackbar in the center of the screen, (x and y axis).
         */
        centered: {
            type: Boolean,
            default: false,
        },

        /**
         * Applies specified color to the control - it can be the name of material color
         * (for example success or purple) or css color (#033 or rgba(255, 0, 0, 0.5)).
         * You can find list of built in classes on the colors page.
         */
        color: {
            type: String,
            required: undefined,
        },

        /**
         * Applies the dark theme variant to the component. You can find more information
         * on the Material Design documentation for dark themes.
         */
        dark: {
            type: Boolean,
            default: false,
        },

        /**
         * Designates an elevation applied to the component between 0 and 24. You can find more information on the elevation page.
         */
        elevation: {
            type: [Number, String],
            default: undefined,
        },

        /**
         * Sets the height for the component.
         */
        height: {
            type: [Number, String],
            default: undefined,
        },

        /**
         * 	Aligns the component towards the left.
         */
        left: {
            type: Boolean,
            default: false,
        },

        /**
         * Applies the light theme variant to the component.
         */
        light: {
            type: Boolean,
            default: false,
        },

        /**
         * Sets the maximum height for the component.
         */
        maxHeight: {
            type: [Number, String],
            default: undefined,
        },

        /**
         * Sets the maximum width for the component.
         */
        maxWidth: {
            type: [Number, String],
            default: undefined,
        },

        /**
         * Sets the minimum height for the component.
         */
        minHeight: {
            type: [Number, String],
            default: undefined,
        },

        /**
         * Sets the minimum width for the component.
         */
        minWidth: {
            type: [Number, String],
            default: undefined,
        },

        /**
         * Gives the snackbar a larger minimum height.
         */
        multiLine: {
            type: Boolean,
            default: false,
        },

        /**
         * Removes elevation (box-shadow) and adds a thin border.
         */
        outlined: {
            type: Boolean,
            default: false,
        },

        /**
         * Aligns the component towards the right.
         */
        right: {
            type: Boolean,
            default: false,
        },

        /**
         * Designates the border-radius applied to the component.
         * You can find more information on the Border Radius page.
         */
        rounded: {
            type: [Boolean, String],
            default: undefined,
        },

        /**
         * Applies a large border radius on the top left and bottom right of the card.
         */
        shaped: {
            type: Boolean,
            default: false,
        },

        /**
         * 	Applies the defined color to text and a low opacity background of the same.
         */
        text: {
            type: Boolean,
            default: false,
        },

        /**
         * Removes the component’s border-radius.
         */
        tile: {
            type: Boolean,
            default: false,
        },

        /**
         * Time (in milliseconds) to wait until snackbar is automatically hidden. Use -1 to keep open indefinitely (0 in version < 2.3 ).
         * It is recommended for this number to be between 4000 and 10000. Changes to this property will reset the timeout.
         */
        timeout: {
            type: [Number, String],
            default: -1,
        },

        /**
         * Aligns the content towards the top.
         */
        top: {
            type: Boolean,
            default: false,
        },

        /**
         * Stacks snackbar content on top of the actions (button).
         */
        vertical: {
            type: Boolean,
            default: false,
        },

        message: {
            type: String,
            requiere: true,
        },
    },

    data() {
        return {
            snackbar: true,
        };
    },

    methods: {
        $_openSnackbar() {
            this.snackbar = !this.snackbar;
        },
    },
};
</script>

<template>
    <v-snackbar
        v-model="snackbar"
        :absolute="absolute"
        :app="app"
        :bottom="bottom"
        :centered="centered"
        :color="color"
        :dark="dark"
        :elevation="elevation"
        :height="height"
        :left="left"
        :light="light"
        :max-height="maxHeight"
        :max-width="maxWidth"
        :min-height="minHeight"
        :min-width="minWidth"
        :multiLine="multiLine"
        :outlined="outlined"
        :right="right"
        :rounded="rounded"
        :shaped="shaped"
        :text="text"
        :tile="tile"
        :top="top"
        :vertical="vertical"
        :timeout="timeout"
    >
        {{ message }}
        <template v-slot:action="{ attrs }">
            <v-btn color="error" text v-bind="attrs" @click="$_openSnackbar">
                X
            </v-btn>
        </template>
    </v-snackbar>
</template>
