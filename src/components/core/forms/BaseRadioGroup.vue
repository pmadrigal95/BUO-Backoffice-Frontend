<script>
/**
 * Descripción: Radio Group reutilizable
 *
 * @displayName BaseRadioGroup
 */

import httpService from '@/services/axios/httpService';

import baseLocalHelper from '@/helpers/baseLocalHelper';

export default {
    name: 'BaseRadioGroup',

    inheritAttrs: false,

    props: {
        /**
         * Appends an icon to the component, uses the same syntax as v-icon
         */
        appendIcon: {
            type: String,
            default: undefined,
        },

        /**
         * Changes the background-color of the input
         */
        backgroundColor: {
            type: String,
            default: undefined,
        },

        /**
         * Displays radio buttons in column
         */
        column: {
            type: Boolean,
            default: true,
        },

        /**
         * Applies the dark theme variant to the component.
         * This will default the components color to white unless you’ve configured your application theme to dark
         * or if you are using the color prop on the component.
         * You can find more information on the Material Design documentation for dark themes.
         */
        dark: {
            type: Boolean,
            default: false,
        },

        /**
         * Reduces the input height
         */
        dense: {
            type: Boolean,
            default: false,
        },

        /**
         * Disable the input
         */
        disabled: {
            type: Boolean,
            default: false,
        },

        /**
         * Puts the input in a manual error state
         */
        error: {
            type: Boolean,
            default: false,
        },

        /**
         * The total number of errors that should display at once
         */
        errorCount: {
            type: [Number, String],
            default: 1,
        },

        /**
         * Puts the input in an error state and passes through custom error messages.
         * Will be combined with any validations that occur from the rules prop. This field will not trigger validation
         */
        errorMessages: {
            type: [String, Array],
            default() {
                return [];
            },
        },

        /**
         * Hides hint and validation errors.
         * When set to auto messages will be rendered only if there’s a message (hint, error message, counter value etc) to display
         */
        hideDetails: {
            type: [Boolean, String],
            default: false,
        },

        /**
         * Hint text
         */
        hint: {
            type: String,
            default: undefined,
        },

        /**
         * Sets the DOM id on the component
         */
        id: {
            type: String,
            default: undefined,
        },

        /**
         * Sets input label
         */
        label: {
            type: String,
            default: 'Estado',
        },

        /**
         * Applies the light theme variant to the component.
         */
        light: {
            type: Boolean,
            default: false,
        },

        /**
         * Forces a value to always be selected (if available).
         */
        mandatory: {
            type: Boolean,
            default: false,
        },

        /**
         * Sets a maximum number of selections that can be made.
         */
        max: {
            type: [Number, String],
            default: undefined,
        },

        /**
         * Displays a list of messages or message if using a string
         */
        messages: {
            type: [String, Array],
            default() {
                return [];
            },
        },

        /**
         * Allow multiple selections. The value prop must be an array.
         */
        multiple: {
            type: Boolean,
            default: false,
        },

        /**
         * Sets the component’s name attribute
         */
        name: {
            type: String,
            default: undefined,
        },

        /**
         * Forces hint to always be visible
         */
        persistentHint: {
            type: Boolean,
            default: false,
        },

        /**
         * Prepends an icon to the component, uses the same syntax as v-icon
         */
        prependIcon: {
            type: String,
            default: undefined,
        },

        /**
         * Puts input in readonly state
         */
        readonly: {
            type: Boolean,
            default: false,
        },

        /**
         * Displays radio buttons in row
         */
        row: {
            type: Boolean,
            default: false,
        },

        /**
         * Accepts a mixed array of types function, boolean and string.
         * Functions pass an input value as an argument and must return either true / false or a string containing an error message.
         * The input field will enter an error state if a function returns (or any value in the array contains) false or is a string
         */
        validate: {
            type: Array,
            required: false,
        },

        /**
         * Puts the input in a manual success state
         */
        success: {
            type: Boolean,
            default: false,
        },

        /**
         * Puts the input in a success state and passes through custom success messages.
         */
        successMessages: {
            type: [String, Array],
            default() {
                return [];
            },
        },

        /**
         * Specify a custom tag used on the root element.
         */
        tag: {
            type: String,
            default: 'div',
        },

        /**
         * Delays validation until blur event
         */
        validateOnBlur: {
            type: Boolean,
            default: false,
        },

        /**
         * The input’s value
         */
        value: {
            default: undefined,
        },

        /**
         * método API / array de valores
         * Requerido
         * An array of items used to build the treeview
         */
        endpoint: {
            type: [Array, String],
            required: true,
        },

        httpMethod: {
            type: String,
            default: 'get',
        },

        httpBody: {
            type: Object,
            default: undefined,
        },

        //Property on supplied items used to keep track of node state. The value of this property has to be unique among all items.
        itemKey: {
            type: String,
            default: 'id',
        },

        //Property on supplied items that contains its label text
        itemText: {
            type: String,
            default: 'name',
        },
    },

    data() {
        return {
            normalRules: [],
            loading: null,
            items: [],
        };
    },

    computed: {
        listeners() {
            return {
                ...this.$listeners,
                input: this.$_updateValue,
            };
        },

        statusList() {
            return [
                { name: 'Activo', id: 2 },
                { name: 'Inactivo', id: 1 },
            ];
        },
    },

    created() {
        if (this.validate != undefined) {
            switch (this.validate[0]) {
                case 'requiered':
                    this.normalRules = [
                        (v) =>
                            !!v ||
                            baseLocalHelper.$_MsgFieldRequired(
                                this.label != undefined ? this.label : ''
                            ),
                    ];
                    break;
                default:
                    this.normalRules = this.validate;
            }
        }
    },

    mounted() {
        /**
         * Obtener lista de valores
         */
        this.$_uploadData();
    },

    methods: {
        $_updateValue(event) {
            this.$emit('input', event);
        },

        $_sendToApi() {
            this.loading = true;
            httpService[this.httpMethod](this.endpoint, this.httpBody).then(
                (response) => {
                    if (response != undefined) {
                        this.items = response.data;
                        this.loading = false;
                    }
                }
            );
        },

        $_uploadData() {
            if (typeof this.endpoint === 'string') {
                if (this.endpoint === 'status') {
                    this.items = this.statusList;
                } else {
                    this.$_sendToApi();
                }
            } else {
                this.items = this.$props.endpoint;
            }
        },
    },
};
</script>

<template>
    <v-radio-group
        class="pl-2 mt-0"
        :append-icon="appendIcon"
        :background-color="backgroundColor"
        :column="column"
        :dark="dark"
        :dense="dense"
        :disabled="disabled"
        :error="error"
        :error-count="errorCount"
        :error-messages="errorMessages"
        :hide-details="hideDetails"
        :hint="hint"
        :id="id"
        :label="label"
        :light="light"
        :mandatory="mandatory"
        :max="max"
        :messages="messages"
        :multiple="multiple"
        :name="name"
        :persistent-hint="persistentHint"
        :prepend-icon="prependIcon"
        :readonly="readonly"
        :row="row"
        :rules="normalRules"
        :success="success"
        :success-messages="successMessages"
        :tag="tag"
        :validate-on-blur="validateOnBlur"
        :value="value"
        @change="$_updateValue"
        v-bind="$attrs"
        v-on="listeners"
    >
        <BaseSkeletonLoader v-if="loading" type="list-item" />
        <v-radio
            v-else
            v-for="item in items"
            :key="item[itemKey]"
            :label="item[itemText]"
            :value="item[itemKey]"
        ></v-radio>
    </v-radio-group>
</template>
