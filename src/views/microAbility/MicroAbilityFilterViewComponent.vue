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

import { baseFilterSettingsHelper } from '@/helpers/baseFilterSettingsHelper';

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
    <BaseCardViewComponent title="Micro-Indicadores">
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
