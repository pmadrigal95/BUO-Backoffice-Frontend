<script>
/**
 * Descripción: Switch reutilizable
 *
 * @displayName BaseSwitch
 */

export default {
    name: 'BaseSwitch',

    inheritAttrs: false,

    props: {
        /**
         * append-icon
         * No Requerido
         */
        appendIcon: {
            type: String,
            default: undefined,
        },

        /**
         * Color del componente
         */
        color: {
            type: String,
            default: undefined,
        },

        /**
         * Uso del theme Dark
         */
        dark: {
            type: Boolean,
            default: false,
        },

        /**
         * Inhabilitar input
         * Default false
         */
        disabled: {
            type: Boolean,
            default: false,
        },

        /**
         * DOM id en el componente
         * Default undefied
         */
        id: {
            type: String,
            default: undefined,
        },

        /**
         * Label del input
         * No Requerido
         */
        label: {
            type: String,
            default: undefined,
        },

        /**
         * Selecionar múltiples. Acepta Array por valor
         * Default false
         */
        multiple: {
            type: Boolean,
            default: false,
        },

        /**
         * Estado de solo lectura
         * Default false
         */
        readonly: {
            type: Boolean,
            default: false,
        },

        /**
         * V-model
         * Requerido
         */
        value: {
            required: true,
        },
    },

    data() {
        return {
            switchValue: this.value,
        };
    },

    computed: {
        /**
         * Comunicación de componente
         */
        listeners() {
            return {
                ...this.$listeners,
                input: this.$emit('input', this.value),
            };
        },
    },

    watch: {
        /**
         * Comunicación de componente
         */
        switchValue(val) {
            this.$emit('input', val);
        },
    },
};
</script>

<template>
    <v-switch
        inset
        :append-icon="appendIcon"
        :color="color"
        :dark="dark"
        :disabled="disabled"
        :id="id"
        :label="label"
        :multiple="multiple"
        :readonly="readonly"
        v-model="switchValue"
        :value="value"
        @input="this.$emit('input', this.value)"
        v-bind="$attrs"
        v-on="listeners"
    />
</template>
