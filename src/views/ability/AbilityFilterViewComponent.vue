<script>
/**
 * Descripción: Pantalla Filtro Habilidades
 *
 * @displayName AbilityFilterViewComponent
 *
 */

import { mapGetters } from 'vuex';

import httpService from '@/services/axios/httpService';

import baseSecurityHelper from '@/helpers/baseSecurityHelper';

const BaseCardViewComponent = () =>
    import('@/components/core/cards/BaseCardViewComponent');

const BaseServerDataTable = () =>
    import('@/components/core/grids/BaseServerDataTable');

const BaseCustomsButtonsGrid = () =>
    import('@/components/core/grids/BaseCustomsButtonsGrid');

export default {
    name: 'AbilityFilterViewComponent',

    components: {
        BaseCardViewComponent,
        BaseServerDataTable,
        BaseCustomsButtonsGrid,
    },

    data() {
        return {
            category: undefined,
            show: false,
        };
    },

    computed: {
        ...mapGetters('authentication', ['user']),

        /**
         * Configuracion BaseServerDataTable
         */
        setting() {
            return {
                endpoint: 'cualificacion/findBy',
                columns: [
                    {
                        text: 'Definición',
                        align: 'start',
                        value: 'definicion',
                        show: true,
                    },
                    {
                        text: 'Descripción',
                        align: 'start',
                        value: 'otroNombre',
                        show: false,
                    },
                    {
                        text: 'Propósito',
                        align: 'start',
                        value: 'proposito',
                        show: false,
                    },
                    {
                        text: 'Ámbito Ocupacional',
                        align: 'start',
                        value: 'ambitoOcupacional',
                        show: false,
                    },
                    {
                        text: 'Link',
                        align: 'start',
                        value: 'link',
                        show: false,
                    },
                    {
                        text: 'interna',
                        type: 'bool',
                        align: 'center',
                        value: 'esInterna',
                        show: true,
                    },
                    {
                        text: 'Categoría',
                        align: 'start',
                        value: 'nombreCategoria',
                        show: true,
                    },
                    {
                        text: 'Categoría Superior',
                        align: 'start',
                        value: 'nombreCategoriaPadre',
                        show: false,
                    },
                    {
                        text: 'Empresa',
                        align: 'start',
                        value: 'nombreOrganizacion',
                        show: true,
                    },
                    {
                        text: 'Tipo',
                        align: 'start',
                        value: 'nombreTipoCualificacion',
                        show: false,
                    },
                    {
                        text: 'Estado',
                        align: 'center',
                        value: 'nombreEstado',
                        show: true,
                    },
                    {
                        text: 'Modificado Por',
                        align: 'start',
                        value: 'usuarioModificaId',
                        show: false,
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
                    'codigoPromocion/deactivate',
                    this.$_createBodyRequestDelete(row)
                )
                .then((response) => {
                    if (response != undefined) {
                        this.$refs.PromotionalCodeFilter.$_ParamsToAPI();
                    }
                });
        },

        /**
         * Pantalla Editor
         */
        $_editor(params) {
            this.$router.push({
                name: 'PromotionalCodesEditorViewComponent',
                params: params && { Id: params.selected[this.setting.key] },
            });
        },

        $_setParams() {
            console.log('object');
        },

        $_clean() {
            console.log('object');
        },

        $_showAdvFilter() {
            this.show = !this.show;
        },
    },
};
</script>

<template>
    <BaseCardViewComponent title="Habilidades">
        <div slot="card-text">
            <v-row dense v-if="show">
                <v-col cols="12" md="6">
                    <BaseForm
                        :block="$vuetify.breakpoint.mobile"
                        labelBtn="Buscar"
                        :method="$_setParams"
                        lblCancel="Limpiar"
                        :cancel="$_clean"
                    >
                        <div slot="body">
                            <v-row dense>
                                <v-col cols="12">
                                    <p
                                        class="BUO-Paragraph-Large-SemiBold grey700--text"
                                    >
                                        Seleccione la categoría
                                    </p>
                                </v-col>
                            </v-row>
                        </div>
                    </BaseForm>
                </v-col>
            </v-row>
        </div>
        <div slot="body">
            <BaseServerDataTable
                ref="abilityFilter"
                :setting="setting"
                :fnNew="write ? $_editor : undefined"
                :fnEdit="write ? $_editor : undefined"
                :fnDelete="write ? $_delete : undefined"
            >
                <div slot="btns">
                    <BaseCustomsButtonsGrid
                        label="Filtro Avanzado"
                        :fnMethod="$_showAdvFilter"
                        :outlined="!show"
                        icon="mdi-filter-cog-outline"
                    />
                </div>
            </BaseServerDataTable>
        </div>
    </BaseCardViewComponent>
</template>
