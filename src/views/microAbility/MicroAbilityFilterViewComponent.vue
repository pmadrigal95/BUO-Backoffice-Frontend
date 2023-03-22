<script>
/**
 * Descripción: Pantalla Filtro Micro Habilidades
 *
 * @displayName MicroAbilityFilterViewComponent
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
    name: 'MicroAbilityFilterViewComponent',

    props: {
        cualificacionId: {
            type: [Number, String],
        },

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

        /**
         * Configuracion BaseServerDataTable
         */
        setting() {
            return {
                endpoint: 'competencia/findBy',
                columns: [
                    {
                        text: 'Habilidad',
                        align: 'start',
                        value: 'definicionCualificacion',
                        show: true,
                    },
                    {
                        text: 'Definición',
                        align: 'start',
                        value: 'definicion',
                        show: true,
                    },
                    {
                        text: 'interna',
                        type: 'bool',
                        align: 'center',
                        value: 'esInterna',
                        show: true,
                    },
                    {
                        text: 'Empresa',
                        align: 'start',
                        value: 'nombreOrganizacion',
                        show: true,
                    },
                    {
                        text: 'Estado',
                        align: 'center',
                        value: 'nombreEstado',
                        show: true,
                    },
                ],
                key: 'id',
            };
        },

        write() {
            const result = baseSecurityHelper.$_ReadPermission(
                this.$router.currentRoute.meta.module,
                baseSecurityHelper.$_write
            );
            return result;
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

            if (this.cualificacionId) {
                array.push({
                    name: 'cualificacionId',
                    value: this.cualificacionId,
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
            const request = {
                userId: this.user.userId,
                id: row[0].id,
            };
            return request;
        },

        /**
         * Delete Function
         */
        $_delete(row) {
            httpService
                .post(
                    'competencia/deactivate',
                    this.$_createBodyRequestDelete(row)
                )
                .then((response) => {
                    if (response != undefined) {
                        this.$refs.microAbilityFilter.$_ParamsToAPI();
                    }
                });
        },

        $_setQuery() {
            if (this.cualificacionId || this.organizacionId) {
                return {
                    cualificacionId: this.cualificacionId
                        ? this.cualificacionId
                        : undefined,
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
        $_editor(params) {
            this.$router.push({
                name: 'MicroAbilityEditorViewComponent',
                params: params && {
                    Id: params.selected[this.setting.key],
                },
                query: !params && this.$_setQuery(),
            });
        },
    },
};
</script>

<template>
    <BaseCardViewComponent title="Micro Habilidades">
        <div slot="card-text">
            <BaseSkeletonLoader v-if="!user && !buoId" type="list-item" />
            <BaseServerDataTable
                v-else
                ref="microAbilityFilter"
                :setting="setting"
                :extraParams="extraParams"
                :fnNew="write ? $_editor : undefined"
                :fnEdit="write ? $_editor : undefined"
                :fnDelete="write ? $_delete : undefined"
            />
        </div>
    </BaseCardViewComponent>
</template>
