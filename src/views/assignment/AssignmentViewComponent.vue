<script>
/**
 * Descripción: Pantalla  Certificaciones
 *
 * @displayName AssignmentViewComponent
 *
 */

import { mapGetters } from 'vuex';

import BaseArrayHelper from '@/helpers/baseArrayHelper';

import baseSecurityHelper from '@/helpers/baseSecurityHelper';

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
    import('@/views/assignment/components/DisplayViewComponent');

const HelperViewComponent = () =>
    import('@/views/assignment/components/HelperViewComponent');

export default {
    name: 'AssignmentViewComponent',

    components: {
        BaseInputTreeview,
        BaseInputDataTable,
        BaseCardViewComponent,
        BaseCustomsButtonsGrid,
        BaseNotFoundContent,
        DisplayViewComponent,
        HelperViewComponent,
    },

    data() {
        return {
            entity: this.$_Object(),
            propEntity: undefined,
            componentKey: 0,
            filterCompanyKey: 0,
            show: true,
        };
    },

    computed: {
        ...mapGetters('theme', ['app']),

        ...mapGetters('authentication', ['user', 'buoId']),

        companySetting() {
            return baseFilterSettingsHelper.$_setCompanySetting({
                isFilter: true,
                singleSelect: true,
            });
        },

        abilityPermission() {
            const result = baseSecurityHelper.$_ReadPermission(
                'AbilityViewComponent'
            );
            return result;
        },

        userPermission() {
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
                    this.entity.departamentoId = undefined;
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
        this.$_setProps();
    },

    methods: {
        /**
         * Entity Object
         */
        $_Object() {
            return {
                organizacionId: undefined,
                departamentoId: undefined,
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
            this.propEntity = BaseArrayHelper.SetObject({}, this.entity);
            this.componentKey++;
        },

        $_clean() {
            this.entity.organizacionId =
                this.user.companyId === this.buoId
                    ? undefined
                    : this.user.companyId;
            this.entity.departamentoId = undefined;
            this.filterCompanyKey++;
            this.$_setProps();
        },

        /**
         * Function to return the UserFilterViewComponent
         */
        $_returnToAbility() {
            this.$router.push({
                name: 'AbilityFilterViewComponent',
            });
        },

        /**
         * Function to return the UserFilterViewComponent
         */
        $_returnToUser() {
            this.$router.push({
                name: 'UserFilterViewComponent',
            });
        },
    },
};
</script>

<template>
    <BaseCardViewComponent title="Asignaciones">
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
                                        :key="filterCompanyKey"
                                        :validate="['requiered']"
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
                            v-if="abilityPermission"
                            label="Administrar Indicadores"
                            :fnMethod="$_returnToAbility"
                            icon="mdi-shield-star"
                            :color="app ? 'blueProgress600' : 'blue800'"
                        />

                        <BaseCustomsButtonsGrid
                            v-if="userPermission"
                            label="Administrar Colaboradores"
                            :fnMethod="$_returnToUser"
                            icon="mdi-account-group-outline"
                            :color="app ? 'blueProgress600' : 'blue800'"
                        />

                        <BaseCustomsButtonsGrid
                            label="Filtro Avanzado"
                            :fnMethod="$_showAdvFilter"
                            :outlined="!show"
                            icon="mdi-filter-cog-outline"
                        />

                        <HelperViewComponent />
                    </v-row>
                    <section class="pt-3">
                        <BaseNotFoundContent
                            v-if="
                                !entity.organizacionId ||
                                !propEntity.organizacionId
                            "
                            msg="Por favor seleccione una empresa"
                        />
                        <DisplayViewComponent
                            :key="componentKey"
                            :entity="propEntity"
                            v-else
                        />
                    </section>
                </v-card-text>
            </v-card>
        </div>
    </BaseCardViewComponent>
</template>
