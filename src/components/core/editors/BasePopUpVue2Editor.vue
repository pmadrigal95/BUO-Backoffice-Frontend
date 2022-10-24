<script>
/**
 * Descripción: Componente BasePopUpVue2Editor
 *
 * Componente que utiliza BaseVue2Editor y BaseDialog
 *
 * @displayName BasePopUpVue2Editor
 */

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
    <div class="cursor">
        <div v-if="type === 'dialog'">
            <!-- @BaseDialog -->
            <BaseDialog ref="Dialog" :width="width" :tittle="formTitle">
                <div slot="Content">
                    <!-- @BaseForm -->
                    <BaseForm
                        :labelBtn="formTitle"
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
            </BaseDialog>
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
            >
                <template v-slot:activator="{ $_open }">
                    <div v-on="$_open">
                        <div v-html="value"></div>
                    </div>
                </template>
                <v-card :max-width="width">
                    <v-list dark color="#5d6d7e">
                        <v-list-item>
                            <v-list-item-avatar>
                                <v-icon>mdi-circle-edit-outline</v-icon>
                            </v-list-item-avatar>
                            <v-list-item-content>
                                <v-list-item-title>{{
                                    formTitle
                                }}</v-list-item-title>
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
                                        <BaseVue2Editor
                                            :customToolbar="customToolbar"
                                            v-model="newData"
                                        />
                                    </v-col>
                                </v-row>
                            </div>
                        </BaseForm>
                    </v-list>
                </v-card>
            </v-menu>
        </div>
    </div>
</template>

<style scoped>
.cursor:hover {
    cursor: pointer;
    color: #0e6655;
}
</style>
