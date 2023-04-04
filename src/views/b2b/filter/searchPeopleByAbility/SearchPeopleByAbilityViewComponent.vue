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

const FilterViewComponent = () =>
    import(
        '@/views/b2b/filter/searchPeopleByAbility/components/FilterViewComponent'
    );

const CardViewComponent = () =>
    import(
        '@/views/b2b/filter/searchPeopleByAbility/components/CardViewComponent'
    );

export default {
    name: 'SearchPeopleByAbilityViewComponent',

    components: {
        BaseInputTreeview,
        BaseInputDataTable,
        BaseNotFoundContent,
        BaseCardViewComponent,
        BaseCustomsButtonsGrid,
        FilterViewComponent,
        CardViewComponent,
    },

    data() {
        return {
            entity: this.$_Object(),
            propEntity: undefined,
            componentKey: 0,
            filterKey: 0,
            show: false,
        };
    },

    computed: {
        ...mapGetters('authentication', ['user', 'buoId']),

        /**
         * Extra Params
         */
        extraParams() {
            return this.entity.organizacionId
                ? [
                      {
                          name: 'organizacionId',
                          value: `${this.entity.organizacionId} | 1`,
                      },
                  ]
                : undefined;
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

        abilitySetting() {
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
                        show: this.user.companyId === this.buoId,
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
                        show:
                            this.user.companyId === this.buoId &&
                            this.$router.currentRoute.name !=
                                'SearchPeopleByAbilityViewComponent',
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
                        type: 'chip',
                        value: 'nombreEstado',
                        show: true,
                    },
                    {
                        text: 'Modificado Por',
                        align: 'start',
                        value: 'nombreUsuarioModifica',
                        show: false,
                    },
                ],
                key: 'id',
                multiSelect: true,
            };
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
                        'No se pueder realizar la búsqueda de más de 5 habilidades a la vez'
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
        subtitle="Busca el talento que necesitas según sus habilidades y tus necesidades"
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
                                        label="¿Cuáles habilidades debe tener esa persona?"
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
                                color="primary"
                                @click="$_clean"
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
                        />

                        <BaseCustomsButtonsGrid
                            label="Filtro Avanzado"
                            :fnMethod="$_showAdvFilter"
                            :outlined="!show"
                            icon="mdi-filter-cog-outline"
                        />
                    </v-row>
                    <div class="pt-3">
                        <BaseNotFoundContent
                            v-if="!propEntity"
                            msg="Busca habilidades o estructura organizacional para encontrar a la persona indicada"
                        />
                        <div v-else>
                            <CardViewComponent
                                :key="componentKey"
                                :entity="propEntity"
                            />
                            <FilterViewComponent
                                :key="componentKey + 1"
                                :entity="propEntity"
                            />
                        </div>
                    </div>
                </v-card-text>
            </v-card>
        </div>
    </BaseCardViewComponent>
</template>
