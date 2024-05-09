<script>
/**
 * Descripción: Pantalla  BaseSelectModalServerDataTable
 *
 * @displayName BaseSelectModalServerDataTable
 *
 */

import { mapGetters } from 'vuex';

import { v4 as uuidv4 } from 'uuid';

import { Container, Draggable } from 'vue-smooth-dnd';

import baseArrayHelper from '@/helpers/baseArrayHelper';

import baseSharedFnHelper from '@/helpers/baseSharedFnHelper';

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

    components: {
        BaseModalServerDataTable,
        BaseCustomsButtonsGrid,
        Container,
        Draggable,
    },

    data() {
        return {
            selected: [],
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

        $_setSingleTarget() {
            if (!this.setting.multiSelect || this.setting.singleSelect) {
                this.selected = [];
            }
        },

        $_setArrayResult(array) {
            array = array.map((element) => {
                return this.requiresPercentage
                    ? {
                          id: element.id,
                          value: element.value,
                          desc: element.desc,
                          number: 60,
                      }
                    : {
                          id: element.id,
                          value: element.value,
                          desc: element.desc,
                      };
            });

            return this.selected != undefined
                ? [...new Set(array.concat(this.selected))]
                : array;
        },

        $_cleanArray(array) {
            this.selected = baseArrayHelper.removeDuplicatesByProperty(
                this.$_setArrayResult(array),
                this.itemValue ? this.itemValue : this.setting.key
            );
        },

        callback(array) {
            this.$_setSingleTarget();

            this.$_cleanArray(array);

            this.$_openModal();
        },

        closeItem(id) {
            this.selected = this.selected.filter((x) => x.id !== id);
        },

        onDrop(dropResult) {
            this.selected = baseSharedFnHelper.$_applyDrag(
                this.selected,
                dropResult
            );
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
                <v-row dense>
                    <Container @drop="onDrop">
                        <Draggable
                            v-for="(item, index) in selected"
                            :key="index"
                        >
                            <v-col cols="12">
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

                                    <v-list-item-content class="ml-n3">
                                        <v-list-item-title
                                            class="BUO-Paragraph-Medium-SemiBold"
                                            :class="[
                                                app
                                                    ? 'white--text'
                                                    : 'grey700--text',
                                            ]"
                                            >{{ item.value }}</v-list-item-title
                                        >
                                        <v-list-item-subtitle
                                            class="BUO-Label-Small"
                                            v-if="item.desc != undefined"
                                            :class="[
                                                app
                                                    ? 'grey400--text'
                                                    : 'grey600--text',
                                            ]"
                                            >{{
                                                item.desc
                                            }}</v-list-item-subtitle
                                        >
                                    </v-list-item-content>

                                    <v-list-item-action
                                        class="BUO-Paragraph-Medium-SemiBold"
                                        :class="[
                                            app
                                                ? 'white--text'
                                                : 'grey700--text',
                                        ]"
                                        v-if="requiresPercentage && item.number"
                                        >{{ item.number }}%</v-list-item-action
                                    >
                                </v-list-item>
                                <v-slider
                                    class="pl-16 mt-n6"
                                    :track-color="app ? 'grey700' : 'white'"
                                    v-if="requiresPercentage && item.number"
                                    v-model="item.number"
                                /> </v-col
                        ></Draggable>
                    </Container>
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
