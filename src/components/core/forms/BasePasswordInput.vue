/* eslint-disable no-useless-escape */
<script>
/**
 * Descripción: Password Input reutilizable
 *
 * @displayName BasePasswordInput
 */

export default {
    name: 'BasePasswordInput',

    inheritAttrs: false,

    props: {
        /**
         * V-model
         */
        value: {
            type: [String, Number],
        },
    },

    data() {
        return {
            showRules: false,
            showPassword: false,
            confirmPwd: undefined,
            rules: {
                required: (value) =>
                    !!value || 'El campo Verificar Contraseña es requerido.',
            },
        };
    },

    computed: {
        listeners() {
            return {
                ...this.$listeners,
                input: this.$_updateValue,
            };
        },

        passwordMatch() {
            return () =>
                this.value === this.confirmPwd ||
                'Las contraseñas no coinciden.';
        },
    },

    /**
     * Metodos click icon
     */
    methods: {
        $_updateValue(event) {
            this.$emit('input', event);
        },

        $_Password() {
            this.showPassword = !this.showPassword;
        },
    },
};
</script>

<template>
    <v-row>
        <v-col cols="12">
            <v-tooltip top v-model="showRules">
                <template v-slot:activator="{ on, attrs }">
                    <div v-bind="attrs" v-on="on">
                        <BaseInput
                            :type="showPassword ? 'text' : 'password'"
                            label="Contraseña"
                            :append-icon="
                                showPassword ? 'mdi-eye' : 'mdi-eye-off'
                            "
                            :clickAppend="$_Password"
                            :value="value"
                            @input="$_updateValue"
                            :validate="['password']"
                            @focus="showRules = true"
                            v-on:blur="showRules = false"
                        />
                    </div>
                </template>
                <ul>
                    <li>8 Caracteres mínimo</li>
                    <li>Una letra mayúscula</li>
                    <li>Un Número</li>
                    <li>Un caracter especial $&*#</li>
                </ul>
            </v-tooltip>
        </v-col>

        <v-col cols="12">
            <BaseInput
                :type="showPassword ? 'text' : 'password'"
                label="Verificar Contraseña"
                v-model.trim="confirmPwd"
                :validate="[rules.required, passwordMatch]"
            />
        </v-col>
    </v-row>
</template>
