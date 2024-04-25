<script>
/**
 * Descripción: Pantalla para información de acceso
 *
 * @displayName AccessSettingsViewComponent
 *
 */
import { mapGetters } from 'vuex';

import {
    baseFilterSettingsHelper,
    baseDataTableColumnsHelper,
} from '@/helpers/baseFilterSettingsHelper';

const BaseInputDataTable = () =>
    import('@/components/core/forms/BaseInputDataTable.vue');

const BaseInputTreeview = () =>
    import('@/components/core/treeview/BaseInputTreeview');

export default {
    name: 'AccessSettingsViewComponent',

    components: {
        BaseInputTreeview,
        BaseInputDataTable,
    },

    props: {
        entity: {
            type: Object,
            required: true,
        },
    },

    data() {
        return {
            componentKey: 0,
        };
    },

    computed: {
        ...mapGetters('authentication', ['user', 'buoId']),

        ...mapGetters('filters', [
            'advfiltersBypageView',
            'dialogViewById',
            'filtersBypageView',
            'pageViewById',
        ]),

        companyDialogView() {
            return this.dialogViewById('companyDialog');
        },

        securityDialogView() {
            return this.pageViewById('securityFilter');
        },

        userTypeList() {
            return [
                { name: 'Normal', id: 0 },
                { name: 'Super administrador', id: 1 },
                { name: 'Administrador de empresa', id: 2 },
            ];
        },

        /**
         * Configuracion BaseInputDataTable

         */
        settingOrganization() {
            return baseFilterSettingsHelper.$_setCompanySetting({
                isFilter: true,
                singleSelect: true,
                list: this.advfiltersBypageView(this.companyDialogView),
                pageView: this.companyDialogView,
            });
        },

        /**
         * Configuracion BaseServerDataTable
         */
        settingRole() {
            return baseFilterSettingsHelper.$_setSecuritySetting({
                isFilter: true,
                singleSelect: false,
                list: this.filtersBypageView(this.securityDialogView),
                pageView: this.securityDialogView,
            });
        },

        /**
         * Extra Params
         */
        extraParams() {
            return baseFilterSettingsHelper.$_setExtraParams({
                companyId: this.entity.organizacionId,
            });
        },
    },

    methods: {
        $_setCompanyFilter() {
            baseDataTableColumnsHelper.$_setCompanyColumns({
                isFilter: true,
                pageView: this.companyDialogView,
            });
        },
    },
};
</script>

<template>
    <v-row dense>
        <v-col cols="12" v-if="user.companyId === buoId">
            <BaseInputDataTable
                v-if="
                    !$router.currentRoute.query.organizacionId &&
                    settingOrganization
                "
                label="Empresa"
                itemText="nombre"
                :setting="settingOrganization"
                :pageView="companyDialogView"
                :editText="entity.nombreOrganizacion"
                v-model.number="entity.organizacionId"
                :fnResetConfig="$_setCompanyFilter"
            />
        </v-col>

        <v-col cols="12">
            <BaseInputTreeview
                label="Área / Departamento"
                v-model.number="entity.departamentoId"
                :editText="entity.nombreDepartamento"
                :readonly="!entity.organizacionId"
                itemText="nombre"
                itemChildren="subDepartamentos"
                :endpoint="`departamento/findAllTree/${entity.organizacionId}`"
            />
        </v-col>

        <v-col cols="12">
            <BaseInputDataTable
                label="Permisos"
                v-if="settingRole"
                :pageView="securityDialogView"
                :setting="settingRole"
                :extraParams="extraParams"
                itemText="nombre"
                :readonly="extraParams.length == 0"
                :editText="entity.roleNames"
                v-model="entity.perfilIds"
                :key="componentKey"
            />
        </v-col>

        <v-col cols="12" v-if="user.companyId === buoId">
            <BaseRadioGroup
                label="Tipo de usuario"
                v-model="entity.tipoUsuarioId"
                :endpoint="userTypeList"
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
