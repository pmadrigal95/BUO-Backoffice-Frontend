<script>
/**
 * Descripción: Pantalla  BaseSelectModalServerDataTable
 *
 * @displayName BaseSelectModalServerDataTable
 *
 */

import { mapGetters } from 'vuex';

import { v4 as uuidv4 } from 'uuid';

const BaseCustomsButtonsGrid = () =>
    import('@/components/core/grids/BaseCustomsButtonsGrid');

const BaseModalServerDataTable = () =>
    import('@/components/core/grids/BaseModalServerDataTable');

export default {
    name: 'BaseSelectModalServerDataTable',

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
            type: Array,
            required: true,
        },
    },

    components: { BaseModalServerDataTable, BaseCustomsButtonsGrid },

    data() {
        return {
            selected: [],
        };
    },

    computed: {
        ...mapGetters('theme', ['app']),
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
         * Abrir modal
         */
        $_openModal() {
            this.$refs[this.refpopUp] &&
                this.$refs[this.refpopUp].$_openModal();
        },

        callback(array) {
            this.selected = [...this.selected, ...array];
            this.$_openModal();
        },
    },
};
</script>

<template>
    <section>
        <BaseModalServerDataTable
            :ref="refpopUp"
            :setting="setting"
            :extraParam="extraParams"
            :pageView="pageView"
            :ispageView="ispageView"
            :fnResetConfig="fnResetConfig"
            :callback="callback"
        />
        <v-row dense v-if="selected.length > 0"> {{ selected }}</v-row>
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
