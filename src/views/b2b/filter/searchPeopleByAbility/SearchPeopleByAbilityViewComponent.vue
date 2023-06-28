<script>
/**
 * Descripción: Pantalla Busqueda de talento
 *
 * @displayName SearchPeopleByAbilityViewComponent
 *
 */

import { mapGetters } from 'vuex';

import BaseArrayHelper from '@/helpers/baseArrayHelper';

import baseLocalHelper from '@/helpers/baseLocalHelper.js';

import baseSecurityHelper from '@/helpers/baseSecurityHelper';

import baseNotificationsHelper from '@/helpers/baseNotificationsHelper';

import { baseFilterSettingsHelper } from '@/helpers/baseFilterSettingsHelper';

const BaseNotFoundContent = () =>
    import('@/components/core/cards/BaseNotFoundContent');

const BaseCardViewComponent = () =>
    import('@/components/core/cards/BaseCardViewComponent');

const BaseInputDataTable = () =>
    import('@/components/core/forms/BaseInputDataTable');

const BaseInputTreeview = () =>
    import('@/components/core/treeview/BaseInputTreeview');

const BaseCustomsButtonsGrid = () =>
    import('@/components/core/grids/BaseCustomsButtonsGrid');

const DisplayViewComponent = () =>
    import(
        '@/views/b2b/filter/searchPeopleByAbility/components/DisplayViewComponent'
    );

export default {
    name: 'SearchPeopleByAbilityViewComponent',

    components: {
        BaseInputTreeview,
        BaseInputDataTable,
        BaseNotFoundContent,
        BaseCardViewComponent,
        BaseCustomsButtonsGrid,
        DisplayViewComponent,
    },

    data() {
        return {
            entity: this.$_Object(),
            propEntity: undefined,
            componentKey: 0,
            filterCompanyKey: 0,
            filterKey: 0,
            show: true,
        };
    },

    computed: {
        ...mapGetters('authentication', ['user', 'buoId']),

        ...mapGetters('theme', ['app']),

        /**
         * Extra Params
         */
        extraParams() {
            return baseFilterSettingsHelper.$_setExtraParams({
                companyId: this.entity.organizacionId,
            });
        },

        companySetting() {
            return baseFilterSettingsHelper.$_setCompanySetting({
                isFilter: true,
                singleSelect: true,
            });
        },

        abilitySetting() {
            return baseFilterSettingsHelper.$_setAbilitySetting({
                method: 'cualificacion/findByFilter',
                isFilter: true,
                singleSelect: false,
            });
        },

        permission() {
            const result =
                baseSecurityHelper.$_ReadPermission('UserViewComponent');
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
                    this.filterKey = this.filterKey + 1;
                    this.entity.departamentoId = undefined;
                    this.entity.cualificacionId = undefined;
                }
            },
            immediate: true,
        },
    },

    created() {
        this.entity.organizacionId =
            this.user.companyId === this.buoId
                ? undefined
                : this.user.companyId;
    },

    methods: {
        /**
         * Entity Object
         */
        $_Object() {
            return {
                organizacionId: undefined,
                departamentoId: undefined,
                cualificacionId: undefined,
            };
        },

        $_showAdvFilter() {
            this.show = !this.show;
            if (this.show) {
                if (this.user.companyId != this.buoId) {
                    this.entity.organizacionId = this.user.companyId;
                }
            }
        },

        $_setProps() {
            const row = this.entity.cualificacionId.length;
            switch (true) {
                case 0:
                    baseNotificationsHelper.Message(
                        true,
                        baseLocalHelper.$_MsgRowNotSelected
                    );
                    break;

                case row >= 0 && row <= 5:
                    this.propEntity = BaseArrayHelper.SetObject(
                        {},
                        this.entity
                    );
                    this.componentKey++;
                    break;
                default:
                    baseNotificationsHelper.Message(
                        true,
                        'No se pueder realizar la búsqueda de más de 5 indicadores a la vez'
                    );
                    break;
            }
        },

        $_clean() {
            this.entity.organizacionId =
                this.user.companyId === this.buoId
                    ? undefined
                    : this.user.companyId;
            this.entity.departamentoId = undefined;
            this.entity.cualificacionId = undefined;
            this.propEntity = undefined;
            this.filterKey = this.filterKey + 1;
            this.filterCompanyKey = this.filterCompanyKey + 1;
        },

        /**
         * Function to return the UserFilterViewComponent
         */
        $_returnToFilter() {
            this.$router.push({
                name: 'UserFilterViewComponent',
            });
        },
    },
};
</script>

<template>
    <BaseCardViewComponent
        title="Talento entre tus colaboradores"
        subtitle="Encuentra el talento que buscas según tus necesidades"
    >
        <div slot="card-text">
            <v-row dense v-show="show" class="pb-2">
                <v-col cols="12" md="6">
                    <BaseForm
                        v-if="user && buoId"
                        :block="$vuetify.breakpoint.mobile"
                        labelBtn="Buscar"
                        :method="$_setProps"
                    >
                        <div slot="body">
                            <v-row dense>
                                <v-col cols="12">
                                    <BaseInputDataTable
                                        v-if="user.companyId === buoId"
                                        label="Empresa"
                                        :setting="companySetting"
                                        v-model.number="entity.organizacionId"
                                        :validate="['requiered']"
                                        :key="filterCompanyKey"
                                    />
                                </v-col>
                                <v-col cols="12">
                                    <BaseInputTreeview
                                        label="Área / Departamento"
                                        v-model.number="entity.departamentoId"
                                        :readonly="!entity.organizacionId"
                                        itemText="nombre"
                                        itemChildren="subDepartamentos"
                                        :endpoint="`departamento/findAllTree/${entity.organizacionId}`"
                                    />
                                </v-col>
                                <v-col cols="12">
                                    <BaseInputDataTable
                                        label="¿Cuáles indicadores necesitas?"
                                        :setting="abilitySetting"
                                        :extraParams="extraParams"
                                        :readonly="extraParams == undefined"
                                        :editText="entity.definicion"
                                        v-model="entity.cualificacionId"
                                        :validate="['requiered']"
                                        :key="filterKey"
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
            <v-card flat class="rounded-t-xl">
                <v-card-text>
                    <v-row justify="end" class="pa-3">
                        <BaseCustomsButtonsGrid
                            v-if="permission"
                            label="Administrar colaboradores"
                            :fnMethod="$_returnToFilter"
                            icon="mdi-account-group-outline"
                            :color="app ? 'blueProgress600' : 'blue800'"
                        />

                        <BaseCustomsButtonsGrid
                            label="Filtro Avanzado"
                            :fnMethod="$_showAdvFilter"
                            :outlined="!show"
                            icon="mdi-filter-cog-outline"
                        />
                    </v-row>
                    <section class="pt-3">
                        <BaseNotFoundContent
                            v-if="!propEntity"
                            msg="Selecciona los indicadores que debe tener la persona que buscas"
                        />
                        <DisplayViewComponent
                            v-else
                            :key="componentKey"
                            :entity="propEntity"
                        />
                    </section>
                </v-card-text>
            </v-card>
        </div>
    </BaseCardViewComponent>
</template>
