<script>
/**
 * Descripción: Pantalla Filtro Departamentos
 *
 * @displayName DepartmentFilterViewComponent
 *
 */

import { mapGetters } from 'vuex';

import httpService from '@/services/axios/httpService';

import baseSecurityHelper from '@/helpers/baseSecurityHelper';

const BaseCardViewComponent = () =>
    import('@/components/core/cards/BaseCardViewComponent');

const BaseServerDataTable = () =>
    import('@/components/core/grids/BaseServerDataTable');

export default {
    name: 'DepartmentFilterViewComponent',

    props: {
        organizacionId: {
            type: [Number, String],
        },
    },

    components: {
        BaseCardViewComponent,
        BaseServerDataTable,
    },

    computed: {
        ...mapGetters('authentication', ['user', 'buoId']),

        write() {
            const result = baseSecurityHelper.$_ReadPermission(
                'DepartmentViewComponent',
                baseSecurityHelper.$_write
            );
            return result;
        },

        setting() {
            return {
                endpoint: 'departamento/findBy',
                columns: [
                    {
                        text: 'Nivel Superior',
                        align: 'start',
                        value: 'etiquetaNivelPadre',
                        show: false,
                    },
                    {
                        text: 'Nivel',
                        align: 'start',
                        value: 'etiquetaNivel',
                        show: false,
                    },
                    {
                        text: 'Nombre',
                        align: 'start',
                        value: 'nombre',
                        show: true,
                    },
                    {
                        text: 'Área / Departamento',
                        align: 'start',
                        value: 'nombrePadre',
                        show: true,
                    },
                    {
                        text: 'Empresa',
                        align: 'start',
                        value: 'nombreOrganizacion',
                        show:
                            this.user.companyId === this.buoId &&
                            this.$router.currentRoute.name !=
                                'CompanyDashboardViewComponent',
                    },
                    {
                        text: 'Administrador',
                        align: 'start',
                        value: 'nombreUsuarioAdmin',
                        show: false,
                    },
                    {
                        text: 'Correo Administrador',
                        align: 'start',
                        value: 'correoUsuarioAdmin',
                        show: false,
                    },
                    {
                        text: 'Teléfono Administrador',
                        align: 'start',
                        value: 'telefonoUsuarioAdmin',
                        show: false,
                    },
                    {
                        text: 'Colaboradores',
                        align: 'end',
                        value: 'cantidadColaboradores',
                        show: true,
                    },
                    {
                        text: 'Descripción',
                        align: 'start',
                        value: 'descripcion',
                        show: false,
                    },
                    {
                        text: 'Estado',
                        align: 'center',
                        type: 'chip',
                        value: 'nombreEstado',
                        show: true,
                    },
                    {
                        text: 'Creado por',
                        align: 'start',
                        value: 'nombreUsuarioModifica',
                        show: false,
                    },
                ],
                key: 'id',
            };
        },

        extraParams() {
            let array = [];
            if (this.user.companyId != this.buoId && !this.organizacionId) {
                array.push({
                    name: 'organizacionId',
                    value: this.user.companyId,
                });
            } else if (this.organizacionId) {
                array.push({
                    name: 'organizacionId',
                    value: this.organizacionId,
                });
            }

            return array.length > 0 ? array : undefined;
        },
    },

    methods: {
        /**
         * Body Request
         */
        $_createBodyRequestDelete(row) {
            return {
                userId: this.user.userId,
                id: row[0].id,
            };
        },

        /**
         * Delete Function
         */
        $_fnDelete(row) {
            httpService
                .post(
                    'departamento/deactivate',
                    this.$_createBodyRequestDelete(row)
                )
                .then((response) => {
                    if (response != undefined) {
                        this.$refs.departmentFilter.$_ParamsToAPI();
                    }
                });
        },

        $_setQuery() {
            if (this.organizacionId) {
                return {
                    organizacionId: this.organizacionId
                        ? this.organizacionId
                        : undefined,
                };
            }

            return undefined;
        },

        /**
         * Pantalla Editor
         */
        $_Editor(params) {
            this.$router.push({
                name: 'DepartmentEditorViewComponent',
                params: params && { Id: params.selected[this.setting.key] },
                query: !params && this.$_setQuery(),
            });
        },
    },
};
</script>

<template>
    <BaseServerDataTable
        v-if="organizacionId"
        ref="departmentFilter"
        :setting="setting"
        :extraParams="extraParams"
        :fnNew="write ? $_Editor : undefined"
        :fnEdit="write ? $_Editor : undefined"
        :fnDelete="write ? $_fnDelete : undefined"
    />
    <BaseCardViewComponent title="Áreas / Departamentos" v-else>
        <div slot="card-text">
            <BaseServerDataTable
                ref="departmentFilter"
                :setting="setting"
                :extraParams="extraParams"
                :fnNew="write ? $_Editor : undefined"
                :fnEdit="write ? $_Editor : undefined"
                :fnDelete="write ? $_fnDelete : undefined"
            />
        </div>
    </BaseCardViewComponent>
</template>
