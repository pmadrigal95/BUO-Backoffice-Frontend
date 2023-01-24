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
        fnConfig: {
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

        /**
         * Cantidad de Filas seleccionadas
         * Default undefined
         */
        rowCount: {
            type: Number,
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

            lblConfig: baseLocalHelper.$_LabelBtnConfig,
        };
    },

    computed: {
        ...mapState('theme', ['app']),

        rows() {
            return baseLocalHelper.$_RowCount(this.rowCount);
        },
    },

    /**
     * Pintar buttons requeridos para el DataTable
     */
    created() {
        this.fnRefresh != undefined
            ? this.items.push(true)
            : this.items.push(false);

        this.fnConfig != undefined
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

        $_Config() {
            this.fnConfig();
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
    <v-row align-content="center" class="py-6 px-3">
        <v-layout
            :justify-space-between="rows"
            :justify-end="!rows"
            align-content-center
        >
            <div
                style="display: flex; flex-wrap: wrap; align-content: center"
                class="BUO-Label-Small ma-2 d-flex justify-start mb-6"
                v-if="rows && $vuetify.breakpoint.mdAndUp"
            >
                {{ rows }}
            </div>
            <div
                :class="[
                    $vuetify.breakpoint.mdAndUp && 'd-flex justify-end mb-6',
                ]"
            >
                <v-tooltip top v-if="items[0]">
                    <template v-slot:activator="{ on }">
                        <v-btn icon :color="app ? 'clouds' : 'black'" v-on="on">
                            <v-icon @click="$_Refresh" small
                                >mdi-autorenew</v-icon
                            >
                        </v-btn>
                    </template>
                    <span>{{ lblRefresh }}</span>
                </v-tooltip>
                <v-tooltip top v-if="items[1]">
                    <template v-slot:activator="{ on }">
                        <v-btn icon :color="app ? 'clouds' : 'black'" v-on="on">
                            <v-icon @click="$_Config" small>mdi-cog</v-icon>
                        </v-btn>
                    </template>
                    <span>{{ lblConfig }}</span>
                </v-tooltip>
                <v-btn
                    class="ma-1 no-uppercase rounded-lg BUO-Paragraph-Small-SemiBold"
                    :color="app ? 'clouds' : 'blue900'"
                    v-if="items[2]"
                    @click="$_Filter"
                    outlined
                    small
                >
                    {{ lblFilter }}
                    <v-icon right>mdi-tune</v-icon>
                </v-btn>
                <v-btn
                    class="ma-1 no-uppercase rounded-lg BUO-Paragraph-Small-SemiBold"
                    :color="app ? 'clouds' : 'blue900'"
                    v-if="items[3]"
                    @click="$_New"
                    outlined
                    small
                >
                    {{ lblNew }}
                    <v-icon right>mdi-plus</v-icon>
                </v-btn>
                <v-btn
                    class="ma-1 no-uppercase rounded-lg BUO-Paragraph-Small-SemiBold"
                    :color="app ? 'clouds' : 'blue900'"
                    v-if="items[4]"
                    @click="$_Edit"
                    outlined
                    small
                >
                    {{ lblEdit }}
                    <v-icon right>mdi-square-edit-outline</v-icon>
                </v-btn>

                <v-btn
                    class="ma-1 no-uppercase rounded-lg BUO-Paragraph-Small-SemiBold"
                    :color="app ? 'clouds' : 'blue900'"
                    v-if="items[5]"
                    @click="$_Delete"
                    outlined
                    small
                >
                    {{ lblDelete }}
                    <v-icon right>mdi-delete-outline</v-icon>
                </v-btn>
                <!-- @slot Use este slot para agregar más botones -->
                <slot name="btns"></slot>
            </div>
        </v-layout>
    </v-row>
</template>
