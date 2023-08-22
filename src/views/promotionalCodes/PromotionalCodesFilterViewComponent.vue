<script>
/**
 * Descripción: Pantalla Filtro Codigo Promocionales
 *
 * @displayName PromotionalCodesFilterViewComponent
 *
 */

import { mapGetters, mapActions } from 'vuex';

import httpService from '@/services/axios/httpService';

import baseSecurityHelper from '@/helpers/baseSecurityHelper';

import { baseFilterSettingsHelper } from '@/helpers/baseFilterSettingsHelper';

const BaseCardViewComponent = () =>
    import('@/components/core/cards/BaseCardViewComponent');

const BaseServerDataTable = () =>
    import('@/components/core/grids/BaseServerDataTable');

export default {
    name: 'PromotionalCodesFilterViewComponent',

    components: {
        BaseCardViewComponent,
        BaseServerDataTable,
    },

    computed: {
        ...mapGetters('authentication', ['user']),

        ...mapGetters('filters', ['filtersBypageView', 'pageViewById']),

        pageView() {
            return this.pageViewById('PromotionalCodesFilterViewComponent');
        },

        /**
         * Configuracion BaseServerDataTable
         */
        setting() {
            return this.filtersBypageView(this.pageView);
        },

        write() {
            const result = baseSecurityHelper.$_ReadPermission(
                'PromotionalCodesViewComponent',
                baseSecurityHelper.$_write
            );
            return result;
        },
    },

    mounted() {
        this.$_setFilter();
    },

    methods: {
        ...mapActions('filters', ['$_set_filter']),

        $_setFilter() {
            const pageView = this.filtersBypageView(this.pageView);

            if (!pageView) {
                this.$_set_filter({
                    [this.pageView]:
                        baseFilterSettingsHelper.$_setPromotionalCodeSetting(
                            {}
                        ),
                });
            }
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
        $_fnDeletePromotionalCode(row) {
            httpService
                .post(
                    'codigoPromocion/deactivate',
                    this.$_createBodyRequestDelete(row)
                )
                .then((response) => {
                    if (response != undefined) {
                        this.$refs[this.pageView].$_ParamsToAPI();
                    }
                });
        },

        /**
         * Pantalla Editor
         */
        $_promotionalCodesEditor(params) {
            this.$router.push({
                name: 'PromotionalCodesEditorViewComponent',
                params: params && { Id: params.selected[this.setting.key] },
            });
        },
    },
};
</script>

<template>
    <BaseCardViewComponent title="Códigos Promocionales">
        <div slot="card-text">
            <BaseServerDataTable
                v-if="setting"
                :ref="pageView"
                :pageView="pageView"
                :setting="setting"
                :fnNew="write ? $_promotionalCodesEditor : undefined"
                :fnEdit="write ? $_promotionalCodesEditor : undefined"
                :fnDelete="write ? $_fnDeletePromotionalCode : undefined"
            />
            <BaseSkeletonLoader v-else type="table" />
        </div>
    </BaseCardViewComponent>
</template>
