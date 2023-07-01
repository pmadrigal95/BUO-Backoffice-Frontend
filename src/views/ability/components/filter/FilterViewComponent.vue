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

import { baseFilterSettingsHelper } from '@/helpers/baseFilterSettingsHelper';

const BaseServerDataTable = () =>
    import('@/components/core/grids/BaseServerDataTable');

const BaseCustomsButtonsGrid = () =>
    import('@/components/core/grids/BaseCustomsButtonsGrid');

const BaseInputDataTable = () =>
    import('@/components/core/forms/BaseInputDataTable');

const BaseInputTreeview = () =>
    import('@/components/core/treeview/BaseInputTreeview');

export default {
    name: 'AbilityFilterViewComponent',

    props: {
        organizacionId: {
            type: [Number, String],
        },
    },

    components: {
        BaseServerDataTable,
        BaseCustomsButtonsGrid,
        BaseInputDataTable,
        BaseInputTreeview,
    },

    data() {
        return {
            entity: this.$_Object(),
            filterCompanyKey: 0,
            show: true,
        };
    },

    computed: {
        ...mapGetters('authentication', ['user', 'buoId']),

        ...mapGetters('theme', ['app']),

        extraParams() {
            return baseFilterSettingsHelper.$_setExtraParams({
                companyId: baseFilterSettingsHelper.$_getCompanyId({
                    userCompanyId: this.user.companyId,
                    companyId: this.organizacionId,
                    filterCompanyId: this.entity.organizacionId,
                }),
            });
        },

        /**
         * Configuracion BaseInputDataTable
         */
        companySetting() {
            return baseFilterSettingsHelper.$_setCompanySetting({
                isFilter: true,
                singleSelect: true,
            });
        },

        /**
         * Configuracion BaseServerDataTable
         */
        setting() {
            return baseFilterSettingsHelper.$_setAbilitySetting({
                companyId: this.user.companyId,
                categoryId: this.entity.categoriaId,
            });
        },

        write() {
            const result = baseSecurityHelper.$_ReadPermission(
                'AbilityViewComponent',
                baseSecurityHelper.$_write
            );
            return result;
        },
    },

    watch: {
        /**
         * Actualizar
         */
        'entity.organizacionId': {
            handler(newValue, oldValue) {
                if (oldValue != newValue) {
                    this.entity.categoriaId = undefined;
                }
            },
            immediate: true,
        },
    },

    created() {
        this.entity.organizacionId =
            this.user.companyId === this.buoId
                ? this.organizacionId
                    ? this.organizacionId
                    : false
                : this.user.companyId;
    },

    methods: {
        /**
         * Entity Object
         */
        $_Object() {
            return {
                organizacionId: null,
                categoriaId: null,
            };
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
                    'cualificacion/deactivate',
                    this.$_createBodyRequestDelete(row)
                )
                .then((response) => {
                    if (response != undefined) {
                        this.$_setParams();
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
        $_editor(params) {
            this.$router.push({
                name: 'AbilityEditorViewComponent',
                params: params && { Id: params.selected[this.setting.key] },
                query: !params && this.$_setQuery(),
            });
        },

        $_setParams() {
            this.$refs.abilityFilter.$_ParamsToAPI();
        },

        $_clean() {
            this.entity.organizacionId =
                this.user.companyId === this.buoId
                    ? undefined
                    : this.user.companyId;
            this.entity.categoriaId = undefined;
            this.filterCompanyKey = this.filterCompanyKey + 1;
            this.$_setParams();
        },

        $_showAdvFilter() {
            this.show = !this.show;

            if (this.show) {
                if (this.user.companyId != this.buoId) {
                    this.entity.organizacionId = this.user.companyId;
                }
            }
        },
    },
};
</script>

<template>
    <section>
        <v-row dense v-show="show">
            <v-col cols="12" md="6">
                <BaseForm
                    v-if="user && buoId"
                    :block="$vuetify.breakpoint.mobile"
                    labelBtn="Buscar"
                    :method="$_setParams"
                >
                    <div slot="body">
                        <v-row dense>
                            <v-col cols="12">
                                <p
                                    class="BUO-Paragraph-Large-SemiBold"
                                    :class="[
                                        app ? 'white--text' : 'grey700--text',
                                    ]"
                                >
                                    Seleccione la categoría
                                </p>
                                <BaseInputDataTable
                                    v-if="
                                        user.companyId === buoId &&
                                        !organizacionId
                                    "
                                    label="Empresa"
                                    :setting="companySetting"
                                    v-model.number="entity.organizacionId"
                                    :key="filterCompanyKey"
                                    :validate="['requiered']"
                                />
                            </v-col>
                            <v-col cols="12">
                                <BaseInputTreeview
                                    label="Categoría"
                                    v-model.number="entity.categoriaId"
                                    :readonly="!entity.organizacionId"
                                    itemText="nombre"
                                    itemChildren="subCategorias"
                                    :endpoint="`categoria/findAllTree/${entity.organizacionId}`"
                                />
                            </v-col>
                        </v-row>
                    </div>
                    <div slot="Beforebtns">
                        <v-btn
                            class="ma-1 no-uppercase rounded-lg BUO-Paragraph-Small-SemiBold"
                            elevation="0"
                            large
                            outlined
                            :color="app ? 'blueProgress600' : 'blue800'"
                            @click="$_clean"
                            :block="$vuetify.breakpoint.mobile"
                        >
                            Limpiar
                        </v-btn>
                    </div>
                </BaseForm>
            </v-col>
        </v-row>
        <section class="pt-6">
            <BaseSkeletonLoader v-if="!user && !buoId" type="list-item" />
            <BaseServerDataTable
                v-else
                ref="abilityFilter"
                :setting="setting"
                :extraParams="extraParams"
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
        </section>
    </section>
</template>
