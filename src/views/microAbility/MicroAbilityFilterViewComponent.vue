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

import {
    baseFilterSettingsHelper,
    baseDataTableColumnsHelper,
} from '@/helpers/baseFilterSettingsHelper';

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

    data() {
        return {
            key: 0,
        };
    },

    computed: {
        ...mapGetters('authentication', ['user', 'buoId']),

        ...mapGetters('filters', ['filtersBypageView', 'pageViewById']),

        pageView() {
            return this.pageViewById('MicroAbilityFilter');
        },

        extraParams() {
            return baseFilterSettingsHelper.$_setExtraParams({
                companyId: baseFilterSettingsHelper.$_getCompanyId({
                    userCompanyId: this.user.companyId,
                    companyId: this.organizacionId,
                }),
                qualificationId: this.cualificacionId,
            });
        },

        /**
         * Configuracion BaseServerDataTable
         */
        setting() {
            return baseFilterSettingsHelper.$_setMicroAbilitySetting({
                companyId: this.user.companyId,
                list: this.filtersBypageView(this.pageView),
                pageView: this.pageView,
            });
        },

        write() {
            const result = baseSecurityHelper.$_ReadPermission(
                'MicroAbilityViewComponent',
                baseSecurityHelper.$_write
            );
            return result;
        },
    },

    methods: {
        $_setFilter() {
            baseDataTableColumnsHelper.$_setMicroAbilityColumns({
                companyId: this.user.companyId,
                pageView: this.pageView,
            });
            this.key++;
        },

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
                        this.$refs[this.pageView].$_ParamsToAPI();
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
    <BaseCardViewComponent title="Micro-Indicadores">
        <div slot="card-text">
            <BaseSkeletonLoader v-if="!user && !buoId" type="list-item" />
            <BaseServerDataTable
                :key="key"
                :fnResetConfig="$_setFilter"
                v-else-if="setting"
                :ref="pageView"
                :pageView="pageView"
                :setting="setting"
                :extraParams="extraParams"
                :fnNew="write ? $_editor : undefined"
                :fnEdit="write ? $_editor : undefined"
                :fnDelete="write ? $_delete : undefined"
            />
        </div>
    </BaseCardViewComponent>
</template>
