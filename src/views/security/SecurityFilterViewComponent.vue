<script>
/**
 * Descripción: Pantalla  Certificaciones
 *
 * @displayName CertificationsViewComponent
 *
 */

import { mapGetters } from 'vuex';

import {
    baseFilterSettingsHelper,
    baseDataTableColumnsHelper,
} from '@/helpers/baseFilterSettingsHelper';

import baseSecurityHelper from '@/helpers/baseSecurityHelper';

const BaseServerDataTable = () =>
    import('@/components/core/grids/BaseServerDataTable');

const BaseCardViewComponent = () =>
    import('@/components/core/cards/BaseCardViewComponent');

const BaseCustomsButtonsGrid = () =>
    import('@/components/core/grids/BaseCustomsButtonsGrid');

const BaseAdvancedFilter = () =>
    import('@/components/backoffice/filter/BaseAdvancedFilter');

export default {
    name: 'SecurityFilterViewComponent',

    components: {
        BaseAdvancedFilter,
        BaseServerDataTable,
        BaseCardViewComponent,
        BaseCustomsButtonsGrid,
    },

    data() {
        return {
            key: 0,
            show: true,
            entity: this.$_Object(),
        };
    },

    computed: {
        ...mapGetters('authentication', ['user', 'buoId']),

        ...mapGetters('filters', ['filtersBypageView', 'pageViewById']),

        permission() {
            const result = baseSecurityHelper.$_ReadPermission(
                this.$router.currentRoute.meta.module,
                baseSecurityHelper.$_write
            );
            return result;
        },

        pageView() {
            return this.pageViewById('securityFilter');
        },

        /**
         * Configuracion BaseServerDataTable
         */
        setting() {
            return baseFilterSettingsHelper.$_setSecuritySetting({
                list: this.filtersBypageView(this.pageView),
                pageView: this.pageView,
            });
        },

        extraParams() {
            return baseFilterSettingsHelper.$_setExtraParams({
                companyId: this.entity.companyId,
            });
        },
    },

    created() {
        this.show = this.user.companyId === this.buoId;
    },

    methods: {
        /**
         * Entity Object
         */
        $_Object() {
            return {
                companyId: undefined,
            };
        },

        $_showAdvFilter() {
            this.show = !this.show;
        },

        $_setFilter() {
            baseDataTableColumnsHelper.$_setSecurityColumns({
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
        $_fnDelete(row) {
            console.log(row);
            // httpService
            //     .post(
            //         '',
            //         this.$_createBodyRequestDelete(row)
            //     )
            //     .then((response) => {
            //         if (response != undefined) {
            //             this.$refs[this.pageView].$_ParamsToAPI();
            //         }
            //     });
        },

        $_fnNew() {
            this.$router.push({
                name: 'SecurityEditorViewComponent',
            });
        },

        $_fnEditor() {
            this.$router.push({
                name: 'SecurityEditorViewComponent',
            });
        },
    },
};
</script>

<template>
    <BaseCardViewComponent
        title="Seguridad"
        subtitle="Crea, edita y administra la seguridad de tu organización"
    >
        <div slot="body">
            <BaseAdvancedFilter :show="show" v-model="entity">
                <div slot="body">
                    <v-card flat class="rounded-t-xl">
                        <v-card-text>
                            <v-layout
                                justify-end
                                v-if="user.companyId === buoId"
                            >
                                <BaseCustomsButtonsGrid
                                    label="Filtro Avanzado"
                                    :fnMethod="$_showAdvFilter"
                                    :outlined="!show"
                                    icon="mdi-filter-cog-outline"
                                />
                            </v-layout>

                            <section v-if="entity.companyId">
                                <BaseServerDataTable
                                    :key="key"
                                    v-if="setting"
                                    :ref="pageView"
                                    :pageView="pageView"
                                    :setting="setting"
                                    :extraParams="extraParams"
                                    :fnResetConfig="$_setFilter"
                                    :needExportToExcel="false"
                                    :fnNew="permission ? $_fnNew : undefined"
                                    :fnEdit="
                                        permission ? $_fnEditor : undefined
                                    "
                                    :fnDelete="
                                        permission ? $_fnDelete : undefined
                                    "
                                />
                                <BaseSkeletonLoader v-else type="table" />
                            </section>
                        </v-card-text>
                    </v-card>
                </div>
            </BaseAdvancedFilter>
        </div>
    </BaseCardViewComponent>
</template>
