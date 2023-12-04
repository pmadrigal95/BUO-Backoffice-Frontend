<script>
/**
 * Descripción: Componente BaseSimpleTextEditor
 *
 * Herramienta para editar un elemento texto en la pantalla SIN SER HTML
 *
 * @displayName BaseSimpleTextEditor
 */

import { mapGetters } from 'vuex';

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
        };
    },

    computed: {
        ...mapGetters('theme', ['app']),

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
    <section @click="$_open" class="cursor py-1 pl-1">
        <v-menu
            v-model="menu"
            :close-on-content-click="close"
            :close-on-click="close"
            bottom
            right
            transition="scale-transition"
            origin="top left"
            :max-width="width"
            rounded
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
            <v-card max-height="100%" max-width="100%" flat class="rounded-b-0">
                <v-toolbar dense flat class="fixed-bar">
                    <v-spacer></v-spacer>
                    <v-btn
                        class="no-uppercase rounded-lg"
                        text
                        :color="app ? 'blueProgress600' : 'blue800'"
                        @click="$_cancel"
                    >
                        Cerrar
                    </v-btn>
                </v-toolbar>

                <v-divider></v-divider>
                <v-card-text>
                    <BaseForm
                        ref="TextEditor"
                        labelBtn="Aceptar"
                        :method="$_save"
                        :cancel="$_cancel"
                    >
                        <div slot="body">
                            <v-row>
                                <v-col>
                                    <!-- @BaseInput -->
                                    <BaseTextArea
                                        v-model.trim="newData"
                                        :validate="['text']"
                                        rows="1"
                                    />
                                </v-col>
                            </v-row>
                        </div>
                    </BaseForm>
                </v-card-text>
            </v-card>
        </v-menu>
    </section>
</template>

<style scoped>
.cursor:hover {
    cursor: pointer;
    font-weight: bold;
    color: #4c798e;
    background-color: #f8f8f8;
}
</style>
