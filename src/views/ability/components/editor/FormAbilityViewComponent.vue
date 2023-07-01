<script>
/**
 * Descripción: Pantalla Editor Habilidades
 *
 * @displayName FormAbilityViewComponent
 *
 */

import { mapGetters } from 'vuex';

import { baseFilterSettingsHelper } from '@/helpers/baseFilterSettingsHelper';

const BaseInputDataTable = () =>
    import('@/components/core/forms/BaseInputDataTable');

const BaseInputTreeview = () =>
    import('@/components/core/treeview/BaseInputTreeview');

export default {
    name: 'FormAbilityViewComponent',

    props: {
        entity: {
            type: Object,
            requiered: true,
        },
    },

    components: {
        BaseInputDataTable,
        BaseInputTreeview,
    },

    computed: {
        /**
         * Configuracion BaseInputDataTable
         */
        companySetting() {
            return baseFilterSettingsHelper.$_setCompanySetting({
                isFilter: true,
                singleSelect: true,
            });
        },

        ...mapGetters('authentication', ['user', 'buoId']),
    },

    mounted() {
        this.$_reviewQueryParams();
    },

    watch: {
        /**
         * Actualizar calendarios
         */
        'entity.organizacionId': {
            handler(newValue, oldValue) {
                if (oldValue) {
                    this.entity.categoriaId = undefined;
                }
            },
            immediate: true,
        },
    },

    methods: {
        $_reviewQueryParams() {
            this.entity.usuarioModificaId = this.user.userId;

            if (this.$router.currentRoute.query.organizacionId) {
                this.entity.organizacionId =
                    this.$router.currentRoute.query.organizacionId;
            }

            if (this.user.companyId != this.buoId) {
                this.entity.organizacionId = this.user.companyId;
            }
        },
    },
};
</script>

<template>
    <v-row dense>
        <v-col cols="12">
            <BaseInput
                label="Definición"
                :max="200"
                v-model.trim="entity.definicion"
                :validate="['text']"
            />
        </v-col>
        <v-col cols="12">
            <BaseTextArea
                label="Descripción"
                :max="1000"
                v-model.trim="entity.otroNombre"
                :validate="['optionalText']"
            />
        </v-col>
        <v-col cols="12" v-if="user.companyId === buoId">
            <BaseInputDataTable
                label="Empresa"
                v-if="!$router.currentRoute.query.organizacionId"
                :setting="companySetting"
                :editText="entity.nombreOrganizacion"
                v-model.number="entity.organizacionId"
                :validate="['requiered']"
            />
        </v-col>
        <v-col cols="12">
            <BaseInputTreeview
                label="Categoría"
                v-model.number="entity.categoriaId"
                :readonly="!entity.organizacionId"
                :editText="entity.nombreCategoria"
                itemText="nombre"
                itemChildren="subCategorias"
                :endpoint="`categoria/findAllTree/${entity.organizacionId}`"
                :validate="['requiered']"
            />
        </v-col>
        <v-col cols="12" v-if="user.companyId === buoId">
            <BaseSwitch
                :disabled="user.companyId != buoId"
                label="Interna"
                v-model="entity.esInterna"
            />
        </v-col>
        <v-col cols="12">
            <BaseRadioGroup
                v-model="entity.estadoId"
                endpoint="status"
                :validate="['requiered']"
            />
        </v-col>
    </v-row>
</template>
