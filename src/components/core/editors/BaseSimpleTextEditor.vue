<script>
/**
 * Descripción: Componente BaseSimpleTextEditor
 *
 * Herramienta para editar un elemento texto en la pantalla SIN SER HTML
 *
 * @displayName BaseSimpleTextEditor
 */

import baseLocalHelper from '@/helpers/baseLocalHelper';

export default {
    name: 'BaseSimpleTextEditor',

    inheritAttrs: false,

    props: {
        /**
         * Tipo de Elemento
         * [h1, h2, h3, h4, h5, h6, subtitle, blockquote, p, code, var, kbd]
         * Default h1
         */
        type: {
            type: String,
            default: 'h1',
        },

        beforeOpen: {
            type: Function,
            default: undefined,
        },

        /**
         * Tamaño de la pantalla emergente
         */
        width: {
            type: [String, Number],
            default: 800,
        },

        /**
         * V-model
         */
        value: {
            type: [String, Number],
        },
    },

    data() {
        return {
            newData: null,
            menu: false,
            close: false,
            formTitle: baseLocalHelper.$_LabelBtnEdit,
        };
    },

    computed: {
        listeners() {
            return {
                ...this.$listeners,
                input: this.$_updateValue,
            };
        },
    },

    /**
     * Metodos
     */
    methods: {
        $_updateValue(event) {
            this.$emit('input', event);
        },

        $_save() {
            this.$_updateValue(this.newData);
            this.$_cancel();
        },

        $_cancel() {
            this.menu = false;
            if (this.beforeOpen != undefined) {
                this.beforeOpen();
            }
        },

        $_open() {
            if (this.beforeOpen != undefined) {
                this.beforeOpen();
            }
            this.newData = this.value;
            this.menu = true;
        },
    },
};
</script>

<template>
    <div @click="$_open" class="cursor">
        <v-menu
            v-model="menu"
            :close-on-content-click="close"
            :close-on-click="close"
            bottom
            right
            transition="scale-transition"
            origin="top left"
            :max-width="width"
        >
            <template v-slot:activator="{ $_open }">
                <div v-on="$_open">
                    <h1 v-if="type === 'h1'">{{ value }}</h1>
                    <h2 v-if="type === 'h2'">{{ value }}</h2>
                    <h3 v-if="type === 'h3'">{{ value }}</h3>
                    <h4 v-if="type === 'h4'">{{ value }}</h4>
                    <h5 v-if="type === 'h5'">{{ value }}</h5>
                    <h6 v-if="type === 'h6'">{{ value }}</h6>
                    <div v-if="type === 'subtitle'">
                        {{ value }}
                    </div>
                    <blockquote v-if="type === 'blockquote'">
                        {{ value }}
                    </blockquote>
                    <p v-if="type === 'p'">{{ value }}</p>
                    <code v-if="type === 'code'">{{ value }}</code>
                    <var v-if="type === 'var'">{{ value }}</var>
                    <kbd v-if="type === 'kbd'">{{ value }}</kbd>
                </div>
            </template>
            <v-card :max-width="width">
                <v-list dark color="#5d6d7e">
                    <v-list-item>
                        <v-list-item-avatar>
                            <v-icon>mdi-circle-edit-outline</v-icon>
                        </v-list-item-avatar>
                        <v-list-item-content>
                            <v-list-item-title>{{ value }}</v-list-item-title>
                        </v-list-item-content>
                        <v-list-item-action>
                            <v-btn icon @click="$_cancel">
                                <v-icon>mdi-close-circle</v-icon>
                            </v-btn>
                        </v-list-item-action>
                    </v-list-item>
                </v-list>
                <v-list>
                    <BaseForm
                        ref="TextEditor"
                        :labelBtn="formTitle"
                        :method="$_save"
                        :cancel="$_cancel"
                    >
                        <div slot="body">
                            <v-row>
                                <v-col>
                                    <!-- @BaseInput -->
                                    <v-textarea
                                        :rules="[
                                            (v) =>
                                                (v && v.length >= 1) ||
                                                baseLocalHelper.$_MsgFieldRequired(
                                                    ''
                                                ),
                                        ]"
                                        auto-grow
                                        autofocus
                                        clearable
                                        rows="1"
                                        v-model="newData"
                                    ></v-textarea>
                                </v-col>
                            </v-row>
                        </div>
                    </BaseForm>
                </v-list>
            </v-card>
        </v-menu>
    </div>
</template>

<style scoped>
.cursor:hover {
    cursor: pointer;
    color: #0e6655;
}
</style>
