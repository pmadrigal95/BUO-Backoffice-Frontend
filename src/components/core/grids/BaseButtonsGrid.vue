<script>
/**
 * Descripción: Botones para la DataTables
 *
 * @displayName BaseButtonsGrid
 */

import baseLocalHelper from '@/helpers/baseLocalHelper';

import { mapState } from 'vuex';

export default {
    name: 'BaseButtonsGrid',

    props: {
        /**
         * Función Refrescar
         * Default undefined
         */
        fnRefresh: {
            type: Function,
            default: undefined,
        },

        /**
         * Función Filtrar Columnas
         * Default undefined
         */
        fnFilter: {
            type: Function,
            default: undefined,
        },

        /**
         * Función Nuevo
         * Default undefined
         */
        fnNew: {
            type: Function,
            default: undefined,
        },

        /**
         * Función Editar
         * Default undefined
         */
        fnEdit: {
            type: Function,
            default: undefined,
        },

        /**
         * Función Eliminar
         * Default undefined
         */
        fnDelete: {
            type: Function,
            default: undefined,
        },
    },
    data() {
        return {
            items: [],

            lblNew: baseLocalHelper.$_LabelBtnNew,

            lblEdit: baseLocalHelper.$_LabelBtnEdit,

            lblDelete: baseLocalHelper.$_LabelBtnDelete,

            lblRefresh: baseLocalHelper.$_LabelBtnRefresh,

            lblFilter: baseLocalHelper.$_LabelBtnFilter,
        };
    },

    computed: {
        ...mapState('theme', ['app']),
    },

    /**
     * Pintar buttons requeridos para el DataTable
     */
    created() {
        this.fnRefresh != undefined
            ? this.items.push(true)
            : this.items.push(false);

        this.fnFilter != undefined
            ? this.items.push(true)
            : this.items.push(false);

        this.fnNew != undefined
            ? this.items.push(true)
            : this.items.push(false);

        this.fnEdit != undefined
            ? this.items.push(true)
            : this.items.push(false);

        this.fnDelete != undefined
            ? this.items.push(true)
            : this.items.push(false);
    },

    /**
     * Ejecutar Click de los buttons
     */
    methods: {
        $_Refresh() {
            this.fnRefresh();
        },

        $_Filter() {
            this.fnFilter();
        },

        $_New() {
            this.fnNew();
        },

        $_Edit() {
            this.fnEdit();
        },

        $_Delete() {
            this.fnDelete();
        },
    },
};
</script>

<template>
    <div id="app">
        <v-row justify="start">
            <v-tooltip top v-if="items[0]">
                <template v-slot:activator="{ on }">
                    <v-btn
                        :color="app ? 'greenA700' : 'blue900'"
                        icon
                        @click="$_Refresh"
                        v-on="on"
                    >
                        <v-icon>mdi-autorenew</v-icon>
                    </v-btn>
                </template>
                <span>{{ lblRefresh }}</span>
            </v-tooltip>
            <v-tooltip top v-if="items[1]">
                <template v-slot:activator="{ on }">
                    <v-btn
                        :color="app ? 'greenA700' : 'blue900'"
                        icon
                        @click="$_Filter"
                        v-on="on"
                    >
                        <v-icon>mdi-toggle-switch</v-icon>
                    </v-btn>
                </template>
                <span>{{ lblFilter }}</span>
            </v-tooltip>
            <v-btn
                class="ma-1 no-uppercase rounded-lg"
                depressed
                small
                v-if="items[2]"
                @click="$_New"
            >
                <v-icon left>mdi-plus</v-icon>
                {{ lblNew }}
            </v-btn>
            <v-btn
                class="ma-1 no-uppercase rounded-lg"
                depressed
                small
                v-if="items[3]"
                @click="$_Edit"
            >
                <v-icon left>mdi-square-edit-outline</v-icon>
                {{ lblEdit }}
            </v-btn>
            <v-btn
                class="ma-1 no-uppercase rounded-lg"
                depressed
                small
                v-if="items[4]"
                @click="$_Delete"
            >
                <v-icon left>mdi-delete-outline</v-icon>
                {{ lblDelete }}
            </v-btn>
            <!-- @slot Use este slot para agregar más botones -->
            <slot name="btns"></slot>
        </v-row>
        <br />
    </div>
</template>
