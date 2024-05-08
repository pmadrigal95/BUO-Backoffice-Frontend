<script>
/**
 * Descripción: Pantalla  BaseSelectModalServerDataTable
 *
 * @displayName BaseSelectModalServerDataTable
 *
 */

import { mapGetters } from 'vuex';

import { v4 as uuidv4 } from 'uuid';

import baseArrayHelper from '@/helpers/baseArrayHelper';

const BaseCustomsButtonsGrid = () =>
    import('@/components/core/grids/BaseCustomsButtonsGrid');

const BaseModalServerDataTable = () =>
    import('@/components/core/grids/BaseModalServerDataTable');

export default {
    name: 'BaseSelectModalServerDataTable',

    inheritAttrs: false,

    /**
     * Comunicación de Componentes
     */
    model: {
        prop: 'value',
        event: 'input',
    },

    props: {
        /**
         * configuración label del btn
         * Requerido
         */
        label: {
            type: String,
            default: 'Agregar',
        },

        /**
         * Objecto de configuración Abarca la config del dataTable
         * Requerido
         */
        setting: {
            type: Object,
            required: true,
        },

        /**
         * Enviar información adicional al servidor
         */
        extraParams: {
            type: Array,
            default: undefined,
        },

        /**
         * Identificador unico para
         * almacenar config en cache
         */
        pageView: {
            type: String,
            default: undefined,
        },

        ispageView: {
            type: Boolean,
            default: false,
        },

        /**
         * Función Reset Config cache
         * Default undefined
         */
        fnResetConfig: {
            type: Function,
            default: undefined,
        },

        value: {
            type: [Array, Object],
            required: true,
        },

        /**
         * Propiedad del valor a guardar
         * Requerido
         */
        itemValue: {
            type: [String, Number],
            default: undefined,
        },

        /**
         * Propiedad del valor a mostrar
         * Requerido
         */
        itemText: {
            type: [String, Number],
            required: true,
        },

        /**
         * Propiedad del valor a mostrar
         * Requerido
         */
        itemDesc: {
            type: [String, Number],
            default: undefined,
        },

        requiresPercentage: {
            type: Boolean,
            default: false,
        },
    },

    components: { BaseModalServerDataTable, BaseCustomsButtonsGrid },

    data() {
        return {
            selected: [],
            componentKey: 0,
        };
    },

    computed: {
        ...mapGetters('theme', ['app']),
    },

    watch: {
        selected: {
            handler(newValue, oldValue) {
                if (newValue != oldValue) {
                    this.$_updateValue(newValue);
                }
            },
            deep: true,
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
         * Método del Comunicación principal
         */
        $_updateValue(event) {
            this.$emit('input', event);
        },

        /**
         * Abrir modal
         */
        $_openModal() {
            this.$refs[this.refpopUp] &&
                this.$refs[this.refpopUp].$_openModal();
        },

        callback(array) {
            const arr =
                this.selected != undefined
                    ? [...new Set(array.concat(this.selected))]
                    : array;

            this.selected = baseArrayHelper.removeDuplicatesByProperty(
                arr,
                this.itemValue ? this.itemValue : this.setting.key
            );

            this.$_openModal();
        },

        closeItem(id) {
            this.selected = this.selected.filter((x) => x.id !== id);
        },
    },
};
</script>

<template>
    <section>
        <BaseModalServerDataTable
            :ref="refpopUp"
            :setting="setting"
            :callback="callback"
            :itemText="itemText"
            :pageView="pageView"
            :itemDesc="itemDesc"
            :itemValue="itemValue"
            :ispageView="ispageView"
            :extraParam="extraParams"
            :fnResetConfig="fnResetConfig"
        />
        <v-card
            v-if="selected.length > 0"
            flat
            :color="app ? undefined : 'grey200'"
            class="rounded-xl mb-4"
        >
            <v-card-text>
                <v-row dense :key="componentKey">
                    <v-col
                        cols="12"
                        v-for="(item, index) in selected"
                        :key="index"
                    >
                        <v-list-item :two-line="item.desc != undefined">
                            <v-list-item-icon>
                                <v-btn
                                    @click="closeItem(item.id)"
                                    icon
                                    :color="app ? 'blue600' : 'black'"
                                >
                                    <v-icon>mdi-close-circle</v-icon>
                                </v-btn>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title>{{
                                    item.value
                                }}</v-list-item-title>
                                <v-list-item-subtitle
                                    v-if="item.desc != undefined"
                                    >{{ item.desc }}</v-list-item-subtitle
                                >
                            </v-list-item-content>
                        </v-list-item>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>

        <v-layout justify-start align-center>
            <BaseCustomsButtonsGrid
                :label="label"
                icon="mdi-plus"
                :fnMethod="$_openModal"
                :color="app ? 'blue600' : 'blue900'"
            />
        </v-layout>
    </section>
</template>
