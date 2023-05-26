<script>
/**
 * Descripción: Pantalla Busqueda de habilidades
 *
 * @displayName SearchAbilitiesByDepartmentOrPersonViewComponent
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
    import(
        '@/views/b2b/filter/searchAbilitiesByDepartmentOrPerson/components/DisplayViewComponent'
    );

export default {
    name: 'SearchAbilitiesByDepartmentOrPersonViewComponent',

    components: {
        BaseInputTreeview,
        BaseInputDataTable,
        BaseCardViewComponent,
        BaseCustomsButtonsGrid,
        DisplayViewComponent,
        BaseNotFoundContent,
    },

    data() {
        return {
            entity: this.$_Object(),
            propEntity: undefined,
            componentKey: 0,
            filterKey: 0,
            filterCompanyKey: 0,
            show: true,
        };
    },

    computed: {
        ...mapGetters('authentication', ['user', 'buoId']),

        /**
         * Extra Params
         */
        extraParams() {
            return baseFilterSettingsHelper.$_setExtraParams({
                companyId: this.entity.organizacionId,
            });
        },

        companySetting() {
            return {
                endpoint: 'organizacion/findBy',
                columns: [
                    {
                        text: 'Nombre',
                        align: 'start',
                        value: 'nombre',
                        show: true,
                    },
                    {
                        text: 'Nombre Contacto',
                        align: 'start',
                        value: 'nombreContacto',
                        show: true,
                    },
                    {
                        text: 'Correo Contacto',
                        align: 'start',
                        value: 'correoContacto',
                        show: true,
                    },
                    {
                        text: 'Token Colaborador',
                        align: 'start',
                        value: 'tokenUsuario',
                        show: false,
                    },
                    {
                        text: 'Colaboradores',
                        align: 'end',
                        value: 'totalUsuarios',
                        show: false,
                    },
                    {
                        text: 'Wallets Activas',
                        align: 'end',
                        value: 'walletsActivas',
                        show: false,
                    },
                    {
                        text: 'Certifica Inmediato',
                        type: 'bool',
                        align: 'center',
                        value: 'certificaInmediato',
                        show: false,
                    },
                    {
                        text: 'Mostrar Puestos Genéricos',
                        type: 'bool',
                        align: 'center',
                        value: 'mostrarPuestosGenericos',
                        show: false,
                    },
                    {
                        text: 'Demo',
                        type: 'bool',
                        align: 'center',
                        value: 'esClienteDemo',
                        show: true,
                    },
                    {
                        text: 'Estado',
                        type: 'chip',
                        align: 'center',
                        value: 'nombreEstado',
                        show: true,
                    },
                    {
                        text: 'Industria',
                        align: 'start',
                        value: 'nombreIndustria',
                        show: false,
                    },
                    {
                        text: 'País',
                        align: 'start',
                        value: 'nombrePais',
                        show: false,
                    },
                    {
                        text: 'Ciudad',
                        align: 'start',
                        value: 'ciudad',
                        show: false,
                    },
                    {
                        text: 'Descripción',
                        align: 'start',
                        value: 'descripcion',
                        show: false,
                    },
                ],
                key: 'id',
            };
        },

        /**
         * Configuracion BaseServerDataTable
         */
        userSetting() {
            return baseFilterSettingsHelper.$_setUserSetting({
                companyId: this.entity.organizacionId,
                departmentId: this.entity.departamentoId,
                singleSelect: false,
            });
        },

        permission() {
            const result = baseSecurityHelper.$_ReadPermission(
                'AbilityViewComponent'
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
                    this.entity.departamentoId = undefined;
                    this.entity.usuarioId = undefined;
                    this.filterKey = this.filterKey + 1;
                }
            },
            immediate: true,
        },

        /**
         * Actualizar
         */
        'entity.departamentoId': {
            handler(newValue, oldValue) {
                if (oldValue != newValue) {
                    this.entity.usuarioId = undefined;
                    this.filterKey = this.filterKey + 1;
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
                usuarioId: undefined,
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
            this.entity.usuarioId = undefined;
            this.entity.departamentoId = null;
            this.filterKey = this.filterKey + 1;
            this.filterCompanyKey = this.filterCompanyKey + 1;
            this.$_setProps();
        },

        /**
         * Function to return the UserFilterViewComponent
         */
        $_returnToFilter() {
            this.$router.push({
                name: 'AbilityFilterViewComponent',
            });
        },
    },
};
</script>

<template>
    <BaseCardViewComponent
        title="Tendencias de Talento"
        subtitle="Selecciona un grupo de personas e identifica tendencias entre ellos."
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
                                        label="Colaboradores"
                                        :setting="userSetting"
                                        :extraParams="extraParams"
                                        itemText="nombreCompleto"
                                        :readonly="extraParams == undefined"
                                        :editText="entity.nombre"
                                        v-model="entity.usuarioId"
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
                                color="primary"
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
                            label="Administrar Indicadores"
                            :fnMethod="$_returnToFilter"
                            icon="mdi-shield-star"
                        />

                        <BaseCustomsButtonsGrid
                            label="Filtro Avanzado"
                            :fnMethod="$_showAdvFilter"
                            :outlined="!show"
                            icon="mdi-filter-cog-outline"
                        />
                    </v-row>
                    <div class="pt-3">
                        <DisplayViewComponent
                            :key="componentKey"
                            :entity="propEntity"
                            v-if="
                                entity.organizacionId &&
                                propEntity.organizacionId
                            "
                        />
                        <BaseNotFoundContent
                            v-else
                            msg="Selecciona un departamento o colaboradores para identificar tendencias entre ellos"
                        />
                    </div>
                </v-card-text>
            </v-card>
        </div>
    </BaseCardViewComponent>
</template>
