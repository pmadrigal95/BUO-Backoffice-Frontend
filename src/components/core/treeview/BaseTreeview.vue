<script>
/**
 * Descripción: Componente Reutilizable v-treeview
 *
 * @displayName BaseTreeview
 */

import { v4 as uuidv4 } from 'uuid';

import httpService from '@/services/axios/httpService';

export default {
    name: 'BaseTreeview',

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

        //When true, allows user to have multiple active nodes at the same time
        multipleActive: {
            type: Boolean,
            default: false,
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
            default: false,
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
            type: Boolean,
            default: false,
        },
    },

    data() {
        return {
            /**
             * Identificador del input
             */
            refTree: 'BaseTreeview_',
            items: [],
            loading: null,
            searchValue: null,
        };
    },

    created() {
        const randomID = uuidv4();

        /**
         * Config Inicial ID
         */
        this.refTree = this.refTree + randomID;
    },

    mounted() {
        /**
         * Obtener lista de valores
         */
        this.$_uploadData();
    },

    methods: {
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

        hello(item) {
            alert(item);
        },

        hello2(item) {
            console.log(item);
        },
    },
};
</script>

<template>
    <div>
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
        >
            <template slot="label" slot-scope="{ item }">
                <div v-on:dblclick="hello2(item)">{{ item[itemText] }}</div>
            </template>
        </v-treeview>
        {{}}
    </div>
</template>
