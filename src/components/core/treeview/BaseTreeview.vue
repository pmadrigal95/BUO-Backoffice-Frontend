<script>
/**
 * Descripción: Componente Reutilizable v-treeview
 *
 * @displayName BaseTreeview
 */

import { mapGetters } from 'vuex';

import { v4 as uuidv4 } from 'uuid';

import httpService from '@/services/axios/httpService';

import baseLocalHelper from '@/helpers/baseLocalHelper';

import baseConfigHelper from '@/helpers/baseConfigHelper';

import baseArrayHelper from '@/helpers/baseArrayHelper';

import baseSharedFnHelper from '@/helpers/baseSharedFnHelper';

import baseNotificationsHelper from '@/helpers/baseNotificationsHelper';

export default {
    name: 'BaseTreeview',

    inheritAttrs: false,

    props: {
        //Allows user to mark a node as active by clicking on it
        activatable: {
            type: Boolean,
            default: true,
        },

        //Syncable prop that allows one to control which nodes are active. The array consists of the item-key of each active item.
        active: {
            type: Array,
            default() {
                return [];
            },
        },

        //The class applied to the node when active
        activeClass: {
            type: String,
            default: 'v-treeview-node--active',
        },

        //Sets the color of the active node
        color: {
            type: String,
            default: 'blue800',
        },

        //Applies the dark theme variant to the component
        dark: {
            type: Boolean,
            default: false,
        },

        //Decreases the height of the items
        dense: {
            type: Boolean,
            default: false,
        },

        //Prevents disabling children nodes
        disablePerNode: {
            type: Boolean,
            default: false,
        },

        //Disables selection for all nodes
        disabled: {
            type: Boolean,
            default: false,
        },

        //Icon used to indicate that a node can be expanded
        expandIcon: {
            type: String,
            default: 'mdi-chevron-down',
        },

        //Custom item filtering function. By default it will use case-insensitive search in item’s label.
        filter: {
            type: Function,
            default: null,
        },

        //Applies a hover class when mousing over nodes
        hoverable: {
            type: Boolean,
            default: true,
        },

        //Icon used when node is in an indeterminate state. Only visible when selectable is true.
        indeterminateIcon: {
            type: String,
            default: '$checkboxIndeterminate',
        },

        //Property on supplied items that contains its children.
        itemChildren: {
            type: String,
            default: 'children',
        },

        //Property on supplied items that contains the disabled state of the item
        itemDisabled: {
            type: String,
            default: 'disabled',
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

        //Applies the light theme variant to the component.
        light: {
            type: Boolean,
            default: false,
        },

        /** A function used when dynamically loading children. If this prop is set,
         *  then the supplied function will be run if expanding an item that has a item-children property that is an empty array.
         *  Supports returning a Promise.
         */
        loadChildren: {
            type: Function,
            default: null,
        },

        //Icon used when node is in a loading state
        loadingIcon: {
            type: String,
            default: '$loading',
        },

        //Icon used when node is not selected. Only visible when selectable is true.
        offIcon: {
            type: String,
            default: '$checkboxOff',
        },

        //Icon used when leaf node is selected or when a branch node is fully selected. Only visible when selectable is true.
        onIcon: {
            type: String,
            default: '$checkboxOn',
        },

        //Syncable prop that allows one to control which nodes are open. The array consists of the item-key of each open item.
        open: {
            type: Array,
            default() {
                return [];
            },
        },

        //When true will cause all branch nodes to be opened when component is mounted
        openAll: {
            type: Boolean,
            default: false,
        },

        /**
         * When true will cause nodes to be opened by clicking anywhere on it,
         * instead of only opening by clicking on expand icon.
         *  When using this prop with activatable you will be unable to mark nodes with children as active.
         */
        openOnClick: {
            type: Boolean,
            default: false,
        },

        /**
         * When true will make v-model, active.sync and open.sync return the complete object instead of just the key
         */
        returnObject: {
            type: Boolean,
            default: true,
        },

        /**
         * Provides an alternative active style for v-treeview node.
         * Only visible when activatable is true and should not be used in conjunction with the shaped prop.
         */
        rounded: {
            type: Boolean,
            default: false,
        },

        /**
         * The search model for filtering results
         */
        search: {
            type: Boolean,
            default: true,
        },

        /**
         * Will render a checkbox next to each node allowing them to be selected
         */
        selectable: {
            type: Boolean,
            default: false,
        },

        //The color of the selection checkbox
        selectedColor: {
            type: String,
            default: 'accent',
        },

        //Controls how the treeview selects nodes. There are two modes available: ‘leaf’ and ‘independent’
        selectionType: {
            type: String,
            default: 'leaf',
        },

        /**
         * Provides an alternative active style for v-treeview node.
         * Only visible when activatable is true and should not be used in conjunction with the rounded prop.
         */
        shaped: {
            type: Boolean,
            default: false,
        },

        /**
         * Applies a transition when nodes are opened and closed
         */
        transition: {
            type: Boolean,
            default: true,
        },

        /**
         * 	Allows one to control which nodes are selected.
            The array consists of the item-key of each selected item. Is used with @input event to allow for v-model binding.
         */
        value: {
            type: [String, Number, Array, Object],
            default: undefined,
        },

        /**
         * Label del Primer botón Footer
         * Default: Guardar
         */
        labelBtn: {
            type: String,
            default: baseLocalHelper.$_LabelBtnSelected,
        },

        /**
         * Función a ejecutar en el Footer con el primer btn
         * Requerida
         */
        footerMethod: {
            type: Function,
            default: undefined,
        },

        /**
         * Función a ejecutar en el Footer con el botón Cancelar
         * no es Requerido
         */
        cancel: {
            type: Function,
            default: undefined,
        },

        /**
         * Función Click
         * Default undefined
         */
        fnClick: {
            type: Function,
            default: undefined,
        },

        /**
         * Función DoubleClick
         * Default undefined
         * Cuidado con las props de footerMethod
         * NO usar en conjunto
         */
        fnDoubleClick: {
            type: [Function, String],
            default: undefined,
        },
    },

    data() {
        return {
            /**
             * Identificador del input
             */
            refTree: 'BaseTreeview_',
            multipleActive: false,
            items: [],
            selected: [],
            loading: null,
            searchValue: null,

            /**
             * Determina contador de clicks
             */
            clickCount: 0,

            /**
             * param tiempo entre clicks
             */
            delay: baseConfigHelper.$_clickDelay,

            /**
             * Descripción del botón
             */
            lblCancel: baseLocalHelper.$_LabelBtnGoOut,

            /**
             * Mostrar btn cancelar del footer
             */
            showCancel: false,

            /**
             * Mostrar btn footer
             */
            showFooter: false,
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

    created() {
        const randomID = uuidv4();

        /**
         * Config Inicial ID
         */
        this.refTree = this.refTree + randomID;

        /**
         * Valida si es necesario el botón de Footer
         */
        if (this.$props.footerMethod != undefined) {
            this.showFooter = true;
        }

        /**
         * Valida si es necesario el botón de Cancelar
         */
        if (this.$props.cancel != undefined) {
            this.showCancel = true;
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
            this.loading = true;
            if (typeof this.$props.endpoint === 'string') {
                this.$_sendToApi();
            } else {
                this.items = this.$props.endpoint;
                this.loading = false;
            }
        },

        /**
         * Validaciones y ejecutar función
         */
        $_click() {
            if (this.fnClick != undefined) {
                /**
                 * Envia Array a ejecutar en la función Click
                 */
                this.fnClick(this.selected);
            }
        },

        /**
         * Botón del Footer
         */
        $_SelectedFooter() {
            if (this.footerMethod != undefined) {
                let origin = [];

                switch (this.selected.length) {
                    case 0:
                        baseNotificationsHelper.Message(
                            true,
                            baseLocalHelper.$_MsgRowNotSelected
                        );
                        break;

                    default:
                        origin = this.selected;
                        this.footerMethod(origin[0]);
                        this.selected = [];
                }
            }
        },

        /**
         * Botón del Footer Cancelar
         */
        $_CancelFooter() {
            this.cancel();
        },

        /**
         * obtener objecto seleccionado
         */
        $_SetParams(array, index) {
            return {
                index: baseArrayHelper.GetObjIndex(array, index),
                selected: index,
            };
        },

        /**
         * Eventos click y DBClick
         */
        $_setSelected() {
            const filter = [...this.$refs[this.refTree]?.activeCache][0];
            const row =
                filter != undefined &&
                baseSharedFnHelper.$_findNestedObj(
                    this.items,
                    this.itemKey,
                    filter
                );

            this.clickCount++;
            if (this.clickCount === 1) {
                this.clickTimer = setTimeout(() => {
                    this.clickCount = 0;

                    let index = baseArrayHelper.GetObjIndex(this.selected, row);

                    if (index === -1) {
                        this.selected = [];
                        this.selected.push(row);
                        this.$_click();
                    } else {
                        baseArrayHelper.DeleteObj(this.selected, index);
                    }
                    this.$_updateValue(
                        this.selected.length > 0 ? this.selected[0] : undefined
                    );
                }, this.delay);
            }
            // else if (this.clickCount === 2) {
            //     clearTimeout(this.clickTimer);

            //     this.clickCount = 0;

            //     if (this.fnDoubleClick != undefined) {
            //         this.fnDoubleClick(row);
            //     }
            //     this.selected = [];
            // }
        },
    },
};
</script>

<template>
    <v-card color="transparent" flat class="rounded-lg">
        <v-card-text>
            <BaseInput
                v-if="search"
                placeholder="Buscar"
                dense
                rounded
                clearable
                v-model="searchValue"
                prepend-inner-icon="mdi-magnify"
            />
            <BaseSkeletonLoader v-if="loading" type="list-item" />
            <v-treeview
                v-else
                :ref="refTree"
                :activatable="activatable"
                :active="active"
                :active-class="activeClass"
                :color="color"
                :dark="dark"
                :dense="dense"
                :disable-per-node="disablePerNode"
                :disabled="disabled"
                :expand-icon="expandIcon"
                :filter="filter"
                :hoverable="hoverable"
                :indeterminate-icon="indeterminateIcon"
                :item-children="itemChildren"
                :item-disabled="itemDisabled"
                :item-key="itemKey"
                :item-text="itemText"
                :items="items"
                :light="light"
                :load-children="loadChildren"
                :loading-icon="loadingIcon"
                :multiple-active="multipleActive"
                :off-icon="offIcon"
                :on-icon="onIcon"
                :open="open"
                :open-all="openAll"
                :open-on-click="openOnClick"
                :return-object="returnObject"
                :rounded="rounded"
                :search="searchValue"
                :selectable="selectable"
                :selected-color="selectedColor"
                :selection-type="selectionType"
                :shaped="shaped"
                :transition="transition"
                @update:active="$_setSelected"
            >
                <template v-slot:label="{ item }">
                    <span class="buo-word-break" style="cursor: pointer">
                        {{ item[itemText] }}
                    </span>
                </template>
            </v-treeview>
            <v-alert
                class="mt-5"
                outlined
                color="blue900"
                v-if="items.length == 0 && !loading"
            >
                <div class="text-center">No hay datos disponibles.</div>
            </v-alert>
        </v-card-text>

        <v-card-actions v-if="showFooter">
            <!-- @helper:  Botones Footer -->
            <v-layout align-end justify-end>
                <v-btn
                    class="ma-1 no-uppercase rounded-lg BUO-Paragraph-Small-SemiBold"
                    :color="app ? 'blueProgress600' : 'blue900'"
                    elevation="0"
                    outlined
                    small
                    @click="$_CancelFooter"
                    v-if="showCancel"
                    >{{ lblCancel }}</v-btn
                >

                <v-btn
                    class="ma-1 no-uppercase rounded-lg BUO-Paragraph-Small-SemiBold"
                    elevation="0"
                    color="blue800"
                    dark
                    small
                    @click="$_SelectedFooter"
                    >{{ labelBtn }}</v-btn
                >
                <!-- @slot Agregar botones después del Btn principal -->
                <slot name="btns"></slot>
            </v-layout>
        </v-card-actions>
    </v-card>
</template>

<style>
.v-treeview-node__content,
.v-treeview-node__label {
    flex-shrink: 1;
    word-break: break-all;
    white-space: unset;
}
.v-treeview-node__root {
    height: auto;
}
</style>
