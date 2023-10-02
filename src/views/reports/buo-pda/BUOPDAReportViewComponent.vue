<script>
/**
 * Descripción: Pantalla Filtro Codigo Promocionales
 *
 * @displayName BUOPDAReportViewComponent
 *
 */

import { mapGetters } from 'vuex';

import baseFnFile from '@/helpers/baseFnFile';

import httpService from '@/services/axios/httpService.js';

import baseLocalHelper from '@/helpers/baseLocalHelper.js';

import baseSecurityHelper from '@/helpers/baseSecurityHelper';

import baseNotificationsHelper from '@/helpers/baseNotificationsHelper';

import {
    baseFilterSettingsHelper,
    baseDataTableColumnsHelper,
} from '@/helpers/baseFilterSettingsHelper';

const BaseCardViewComponent = () =>
    import('@/components/core/cards/BaseCardViewComponent');

const BaseServerDataTable = () =>
    import('@/components/core/grids/BaseServerDataTable');

const BaseCustomsButtonsGrid = () =>
    import('@/components/core/grids/BaseCustomsButtonsGrid');

const BaseAdvancedFilter = () =>
    import('@/components/backoffice/filter/BaseAdvancedFilter');

export default {
    name: 'BUOPDAReportViewComponent',

    components: {
        BaseAdvancedFilter,
        BaseServerDataTable,
        BaseCardViewComponent,
        BaseCustomsButtonsGrid,
    },

    data() {
        return {
            entity: this.$_Object(),
            key: 0,
            show: true,
            loading: [{ value: false }, { value: false }],
        };
    },

    computed: {
        ...mapGetters('theme', ['app']),

        ...mapGetters('authentication', ['user', 'buoId']),

        ...mapGetters('filters', ['filtersBypageView', 'pageViewById']),

        pageView() {
            return this.pageViewById('BUOPDAReport');
        },

        extraParams() {
            return (
                this.entity.companyId &&
                baseFilterSettingsHelper.$_setExtraParams({
                    companyId: this.entity.companyId,
                })
            );
        },

        /**
         * Configuracion BaseServerDataTable
         */
        setting() {
            return baseFilterSettingsHelper.$_setUserSetting({
                companyId: this.entity.companyId,
                departmentId: this.entity.departmentId,
                singleSelect: false,
                list: this.filtersBypageView(this.pageView),
                pageView: this.pageView,
            });
        },

        permission() {
            const result = baseSecurityHelper.$_ReadPermission(
                'BUOPDAReportViewComponent',
                baseSecurityHelper.$_download
            );
            return result;
        },
    },

    methods: {
        $_setFilter() {
            baseDataTableColumnsHelper.$_setUserColumns({
                companyId: this.entity.companyId,
                departmentId: this.entity.departmentId,
                pageView: this.pageView,
            });

            this.key++;
        },

        /**
         * Entity Object
         */
        $_Object() {
            return {
                companyId: undefined,
                departmentId: undefined,
            };
        },

        $_sendToApi(entity, number) {
            this.loading[number].value = true;
            httpService
                .post('buo_pda/reporte_resumen', entity)
                .then((response) => {
                    if (response != undefined) {
                        if (response.data == '') {
                            baseNotificationsHelper.Message(
                                true,
                                'Solo se podra generar el reporte de aquellos usuarios que cuenten con el test PDA'
                            );
                        } else {
                            baseFnFile.$_dowloadFile(
                                response.data.fileEncoded,
                                response.data.fileName,
                                baseFnFile.$_extensionsName.zip
                            );
                        }

                        this.loading[number].value = false;
                    }
                });
        },

        /**
         * Get a registry
         */
        $_GetRow() {
            return this.$refs[this.pageView].$data.selected;
        },

        /**
         * download Zip File
         */
        $_downloadMultipleFiles() {
            const data = [];
            this.$_GetRow().forEach(
                (element) =>
                    element.conPda && data.push(element[this.setting.key])
            );

            if (
                this.$_GetRow().length > 0 &&
                this.$_GetRow().some((element) => element.conPda === false)
            ) {
                baseNotificationsHelper.Message(
                    true,
                    'Solo se podra generar el reporte de aquellos usuarios que cuenten con el test PDA'
                );
            }

            if (data != undefined && data.length > 0) {
                this.$_sendToApi(
                    {
                        organizacionId: this.entity.companyId,
                        empleados: data,
                    },
                    0
                );
            } else {
                if (this.$_GetRow().length <= 0)
                    baseNotificationsHelper.Message(
                        true,
                        baseLocalHelper.$_MsgRowNotSelected
                    );
            }
        },

        /**
         * download Zip File
         */
        $_downloadAll() {
            this.$_sendToApi({ organizacionId: this.entity.companyId }, 1);
        },

        $_setParams() {
            this.$refs.UserFilter.$_ParamsToAPI();
        },

        $_userDetails(params) {
            const row = params ? [params.selected] : this.$_GetRow();

            switch (row.length) {
                case 0:
                    baseNotificationsHelper.Message(
                        true,
                        baseLocalHelper.$_MsgRowNotSelected
                    );
                    break;

                case 1:
                    if (row[0].conPda) {
                        this.$router.push({
                            name: 'BUOPDAUserDetailsReportViewComponent',
                            params: row && { Id: row[0].id },
                        });
                    } else {
                        baseNotificationsHelper.Message(
                            true,
                            'Usuario no cuenta con test PDA'
                        );
                    }
                    break;
                default:
                    baseNotificationsHelper.Message(
                        true,
                        baseLocalHelper.$_MsgRowNotMultiSelected
                    );
                    break;
            }
        },

        $_showAdvFilter() {
            this.show = !this.show;
        },
    },
};
</script>

<template>
    <BaseCardViewComponent title="Generador de Reporte Buo-PDA">
        <div slot="body">
            <BaseAdvancedFilter :show="show" v-model="entity" isDepartment>
                <div slot="body">
                    <BaseServerDataTable
                        :key="key"
                        v-if="setting"
                        :ref="pageView"
                        :pageView="pageView"
                        :setting="setting"
                        :extraParams="extraParams"
                        :fnResetConfig="$_setFilter"
                        :fnDoubleClick="$_userDetails"
                    >
                        <div slot="btns">
                            <BaseCustomsButtonsGrid
                                label="Ver Reporte"
                                :fnMethod="$_userDetails"
                                icon="mdi-chevron-right"
                                :color="app ? 'blueProgress600' : 'blue800'"
                            />

                            <BaseCustomsButtonsGrid
                                v-if="permission"
                                label="Descargar"
                                :fnMethod="$_downloadMultipleFiles"
                                icon="mdi-download"
                                :loading="loading[0].value"
                                :color="app ? 'blueProgress600' : 'blue800'"
                            />

                            <BaseCustomsButtonsGrid
                                v-if="permission"
                                label="Descargar todo"
                                :outlined="false"
                                :fnMethod="$_downloadAll"
                                icon="mdi-download-multiple"
                                :loading="loading[1].value"
                            />

                            <BaseCustomsButtonsGrid
                                label="Filtro Avanzado"
                                :fnMethod="$_showAdvFilter"
                                :outlined="!show"
                                icon="mdi-filter-cog-outline"
                            />
                        </div>
                    </BaseServerDataTable>
                    <BaseSkeletonLoader v-else type="table" />
                </div>
            </BaseAdvancedFilter>
        </div>
    </BaseCardViewComponent>
</template>
