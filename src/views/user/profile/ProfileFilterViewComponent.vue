<script>
/**
 * Descripción: Pantalla Filtro Perfiles
 *
 * @displayName ProfileFilterViewComponent
 *
 */

import { mapGetters } from 'vuex';

import BaseArrayHelper from '@/helpers/baseArrayHelper';

const BaseCardViewComponent = () =>
    import('@/components/core/cards/BaseCardViewComponent');

const BaseInputDataTable = () =>
    import('@/components/core/forms/BaseInputDataTable');

const BaseInputTreeview = () =>
    import('@/components/core/treeview/BaseInputTreeview');

const BaseCustomsButtonsGrid = () =>
    import('@/components/core/grids/BaseCustomsButtonsGrid');

const DisplayViewComponent = () =>
    import('@/views/user/profile/components/DisplayViewComponent.vue');

export default {
    name: 'ProfileFilterViewComponent',

    components: {
        BaseCardViewComponent,
        DisplayViewComponent,
        BaseInputTreeview,
        BaseCustomsButtonsGrid,
        BaseInputDataTable,
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
        ...mapGetters('authentication', ['user', 'buoId']),

        ...mapGetters('theme', ['app']),

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

        $_setProps() {
            this.propEntity = BaseArrayHelper.SetObject({}, this.entity);
            this.componentKey++;
        },

        $_clean() {
            this.entity.organizacionId =
                this.user.companyId === this.buoId
                    ? undefined
                    : this.user.companyId;
            this.entity.departamentoId = null;
            this.filterCompanyKey = this.filterCompanyKey + 1;
            this.$_setProps();
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
    <BaseCardViewComponent
        title="Perfiles de Colaboradores"
        subtitle="Descubre el perfil de cada persona, sus indicadores y PDA"
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
                            label="Filtro Avanzado"
                            :fnMethod="$_showAdvFilter"
                            :outlined="!show"
                            icon="mdi-filter-cog-outline"
                        />
                    </v-row>
                    <section class="pt-3">
                        <DisplayViewComponent
                            :key="componentKey"
                            :entity="propEntity"
                        />
                    </section>
                </v-card-text>
            </v-card>
        </div>
    </BaseCardViewComponent>
</template>
