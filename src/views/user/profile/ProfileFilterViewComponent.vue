<script>
/**
 * Descripción: Pantalla Filtro Perfiles
 *
 * @displayName ProfileFilterViewComponent
 *
 */

import { mapGetters } from 'vuex';

import baseLocalHelper from '@/helpers/baseLocalHelper.js';

import baseNotificationsHelper from '@/helpers/baseNotificationsHelper';

const BaseCardViewComponent = () =>
    import('@/components/core/cards/BaseCardViewComponent');

const BaseServerDataTable = () =>
    import('@/components/core/grids/BaseServerDataTable');

const BaseInputTreeview = () =>
    import('@/components/core/treeview/BaseInputTreeview');

const BaseCustomsButtonsGrid = () =>
    import('@/components/core/grids/BaseCustomsButtonsGrid');

const BaseInputDataTable = () =>
    import('@/components/core/forms/BaseInputDataTable');

export default {
    name: 'ProfileFilterViewComponent',

    components: {
        BaseCardViewComponent,
        BaseServerDataTable,
        BaseInputTreeview,
        BaseCustomsButtonsGrid,
        BaseInputDataTable,
    },

    data() {
        return {
            entity: this.$_Object(),
            componentKey: 0,
            show: true,
        };
    },

    computed: {
        ...mapGetters('authentication', ['user', 'buoId']),

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
        setting() {
            return {
                endpoint: this.entity.departamentoId
                    ? `user/findByDeep/${this.entity.departamentoId}`
                    : 'user/findBy',
                columns: [
                    {
                        text: 'Nombre',
                        align: 'start',
                        value: 'nombre',
                        show: false,
                    },
                    {
                        text: 'Primer Apellido',
                        align: 'start',
                        value: 'primerApellido',
                        show: false,
                    },
                    {
                        text: 'Segundo Apellido',
                        align: 'start',
                        value: 'segundoApellido',
                        show: false,
                    },
                    {
                        text: 'Nombre Completo',
                        align: 'start',
                        value: 'nombreCompleto',
                        show: true,
                    },
                    {
                        text: 'Correo',
                        align: 'start',
                        value: 'correo',
                        show: true,
                    },
                    {
                        text: 'País',
                        align: 'start',
                        value: 'nombrePais',
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
                        text: 'Wallet Activo',
                        type: 'bool',
                        align: 'center',
                        value: 'walletActivo',
                        show: true,
                    },
                    {
                        text: 'Test PDA',
                        type: 'bool',
                        align: 'center',
                        value: 'conPda',
                        show: true,
                    },
                    {
                        text: 'Identificación',
                        align: 'center',
                        value: 'identificacion',
                        show: false,
                    },
                    {
                        text: 'Género',
                        align: 'center',
                        value: 'nombreGenero',
                        show: false,
                    },
                    {
                        text: 'Ciudad',
                        align: 'center',
                        value: 'ciudad',
                        show: false,
                    },
                    {
                        text: 'Telefóno',
                        align: 'center',
                        value: 'telefono',
                        show: false,
                    },
                    {
                        text: 'Username',
                        align: 'center',
                        value: 'username',
                        show: false,
                    },
                    {
                        text: 'Empresa',
                        align: 'start',
                        value: 'nombreOrganizacion',
                        show: this.user.companyId === this.buoId,
                    },
                    {
                        text: 'Área / Departamento',
                        align: 'start',
                        value: 'nombreDepartamento',
                        show: this.entity.departamentoId != undefined,
                    },
                ],
                key: 'id',
            };
        },

        extraParams() {
            let array = [];
            if (this.user.companyId != this.buoId) {
                array.push({
                    name: 'organizacionId',
                    value: this.user.companyId,
                });
            } else if (this.entity.organizacionId) {
                array.push({
                    name: 'organizacionId',
                    value: this.entity.organizacionId,
                });
            }

            return array.length > 0 ? array : undefined;
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

    methods: {
        /**
         * Get a registry
         */
        $_GetRow() {
            return this.$refs.ProfileFilter.$data.selected;
        },

        /**
         * Entity Object
         */
        $_Object() {
            return {
                organizacionId: undefined,
                departamentoId: undefined,
            };
        },

        $_setParams() {
            this.$refs.ProfileFilter.$_ParamsToAPI();
            this.componentKey++;
        },

        $_clean() {
            this.entity.organizacionId =
                this.user.companyId === this.buoId
                    ? undefined
                    : this.user.companyId;
            this.entity.departamentoId = undefined;
            this.$_setParams();
        },

        $_userDetails(params) {
            const row = params ? [params.selected] : this.$_GetRow();

            switch (row.length) {
                case 0:
                    baseNotificationsHelper.Message(
                        true,
                        baseLocalHelper.$_MsgRowNotSelected
                    );
                    break;

                case 1:
                    this.$router.push({
                        name: 'ProfileDetailsViewComponent',
                        params: row && { Id: row[0].id },
                    });
                    break;
            }
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
        title="Perfil del colaborador"
        subtitle="Busca toda la información de tus colaboradores"
    >
        <div slot="card-text">
            <v-row dense v-show="show">
                <v-col cols="12" md="6">
                    <BaseForm
                        v-if="user && buoId"
                        :block="$vuetify.breakpoint.mobile"
                        labelBtn="Buscar"
                        :method="$_setParams"
                    >
                        <div slot="body">
                            <v-row>
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
            <v-card> </v-card>
        </div>

        <div slot="body">
            <BaseSkeletonLoader v-if="!user && !buoId" type="list-item" />
            <BaseServerDataTable
                ref="ProfileFilter"
                :key="componentKey"
                :setting="setting"
                :extraParams="extraParams"
                :fnDoubleClick="$_userDetails"
            >
                <div slot="btns">
                    <BaseCustomsButtonsGrid
                        label="Ver Perfil"
                        :fnMethod="$_userDetails"
                        icon="mdi-chevron-right"
                    />

                    <BaseCustomsButtonsGrid
                        label="Filtro Avanzado"
                        :fnMethod="$_showAdvFilter"
                        :outlined="!show"
                        icon="mdi-filter-cog-outline"
                    />
                </div>
            </BaseServerDataTable>
        </div>
    </BaseCardViewComponent>
</template>
