<script>
/**
 * Descripción: Pantalla para información de acceso
 *
 * @displayName AccessSettingsViewComponent
 *
 */

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

        <v-col cols="12">
            <BaseRadioGroup
                v-model="entity.estadoId"
                endpoint="status"
                :validate="['requiered']"
            />
        </v-col>
    </v-row>
</template>
