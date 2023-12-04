<script>
/**
 * Descripción: Componente BasePopUpVue2Editor
 *
 * Componente que utiliza BaseVue2Editor y BaseDialog
 *
 * @displayName BasePopUpVue2Editor
 */

import { mapGetters } from 'vuex';

import baseLocalHelper from '@/helpers/baseLocalHelper';

const BaseVue2Editor = () =>
    import('@/components/core/editors/BaseVue2Editor.vue');

export default {
    name: 'BasePopUpVue2Editor',

    inheritAttrs: false,

    props: {
        /**
         * Tipo de Elemento
         * [dialog, popUp]
         * Default dialog
         */
        type: {
            type: String,
            default: 'dialog',
        },

        beforeOpen: {
            type: Function,
            default: undefined,
        },

        /**
         * Elementos del toolBar
         * doc: https://github.com/davidroyer/vue2-editor/blob/master/src/helpers/default-toolbar.js
         */
        customToolbar: {
            type: Array,
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

    components: {
        BaseVue2Editor,
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
            if (this.beforeOpen != undefined) {
                this.beforeOpen();
            }

            if (this.type === 'popUp') {
                this.menu = false;
            } else {
                this.$refs.Dialog.$_openModal();
            }
        },

        $_open() {
            if (this.beforeOpen != undefined) {
                this.beforeOpen();
            }

            this.newData = this.value;
            if (this.type === 'popUp') {
                this.menu = true;
            } else {
                this.$refs.Dialog.$_openModal();
            }
        },
    },
};
</script>

<template>
    <section class="cursor py-1 pl-1">
        <div v-if="type === 'dialog'">
            <BasePopUp
                ref="Dialog"
                :maxWidth="$vuetify.breakpoint.mobile ? '100%' : width"
                :isDrawer="false"
                scrollable
            >
                <div slot="Content">
                    <BaseForm
                        labelBtn="Aceptar"
                        :method="$_save"
                        :cancel="$_cancel"
                    >
                        <div slot="body">
                            <v-row>
                                <v-col>
                                    <BaseVue2Editor
                                        :customToolbar="customToolbar"
                                        v-model="newData"
                                    />
                                </v-col>
                            </v-row>
                        </div>
                    </BaseForm>
                </div>
            </BasePopUp>
            <div @click="$_open" v-html="value"></div>
        </div>
        <div @click="$_open" v-if="type === 'popUp'">
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
                        <div v-html="value" />
                    </div>
                </template>
                <v-card
                    max-height="100%"
                    max-width="100%"
                    flat
                    class="rounded-b-0"
                >
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
                                        <BaseVue2Editor
                                            :customToolbar="customToolbar"
                                            v-model="newData"
                                        />
                                    </v-col>
                                </v-row>
                            </div>
                        </BaseForm>
                    </v-card-text>
                </v-card>
            </v-menu>
        </div>
    </section>
</template>

<style scoped>
.cursor:hover {
    cursor: pointer;
    color: #4c798e;
    background-color: #f8f8f8;
}
</style>
