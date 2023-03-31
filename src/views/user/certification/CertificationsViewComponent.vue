<script>
/**
 * Descripción: Pantalla  Certificaciones
 *
 * @displayName CertificationsViewComponent
 *
 */
import { mapGetters } from 'vuex';

import baseConfigHelper from '@/helpers/baseConfigHelper';

const BaseInputDataTable = () =>
    import('@/components/core/forms/BaseInputDataTable');

const BaseCardViewComponent = () =>
    import('@/components/core/cards/BaseCardViewComponent');

const CertificationFilter = () =>
    import(
        '@/views/user/certification/components/CertificationsFilterViewComponent'
    );

const BaseCustomsButtonsGrid = () =>
    import('@/components/core/grids/BaseCustomsButtonsGrid');

export default {
    name: 'CertificationsViewComponent',

    components: {
        BaseInputDataTable,
        BaseCardViewComponent,
        CertificationFilter,
        BaseCustomsButtonsGrid,
    },

    data() {
        return {
            tab: null,
            show: false,
            organizacionId: undefined,
            companyName: undefined,
            componentKey: 0,
            componentGrid: 0,
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

        certifying() {
            return baseConfigHelper.$_statusCode.certifying;
        },

        certificate() {
            return baseConfigHelper.$_statusCode.certificate;
        },

        rejected() {
            return baseConfigHelper.$_statusCode.rejected;
        },
    },

    methods: {
        $_setParams() {
            this.componentGrid++;
        },

        $_clean() {
            this.organizacionId = this.user.companyId;
            this.companyName = this.user.companyName;
            this.componentGrid++;
            this.componentKey++;
            this.$_setParams();
        },

        $_showAdvFilter() {
            this.show = !this.show;
            if (this.show) {
                if (this.user.companyId != this.buoId) {
                    this.organizacionId = this.user.companyId;
                }
            }
        },
    },
};
</script>

<template>
    <div>
        <BaseCardViewComponent title="Certificaciones">
            <div slot="card-text" v-if="show">
                <v-row dense>
                    <v-col cols="12" md="6">
                        <BaseForm
                            :block="$vuetify.breakpoint.mobile"
                            labelBtn="Buscar"
                            :method="$_setParams"
                        >
                            <div slot="body">
                                <v-row dense>
                                    <v-col cols="12">
                                        <p
                                            class="BUO-Paragraph-Large-SemiBold grey700--text"
                                        >
                                            Seleccione la empresa
                                        </p>
                                        <BaseInputDataTable
                                            v-if="user.companyId === buoId"
                                            label="Empresa"
                                            :editText="companyName"
                                            :setting="companySetting"
                                            v-model="organizacionId"
                                            :validate="['requiered']"
                                            :key="componentKey"
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
            </div>
            <div slot="body">
                <v-card flat class="rounded-t-xl">
                    <v-card-text>
                        <v-layout justify-end>
                            <BaseCustomsButtonsGrid
                                label="Filtro Avanzado"
                                :fnMethod="$_showAdvFilter"
                                :outlined="!show"
                                icon="mdi-filter-cog-outline"
                                v-if="user.companyId === buoId"
                            />
                        </v-layout>
                    </v-card-text>

                    <v-tabs
                        v-model="tab"
                        right
                        show-arrows
                        height="25"
                        class="pa-6 pt-5"
                        flat
                    >
                        <v-tabs-slider color="transparent"></v-tabs-slider>
                        <v-tab class="rounded-pill no-uppercase"
                            >Pendientes</v-tab
                        >
                        <v-tab class="rounded-pill no-uppercase">
                            Aprobadas
                        </v-tab>
                        <v-tab class="rounded-pill no-uppercase">
                            Rechazadas</v-tab
                        >
                    </v-tabs>

                    <v-tabs-items v-model="tab" class="pa-5">
                        <v-tab-item>
                            <CertificationFilter
                                :statusCode="certifying"
                                :organizacionId="organizacionId"
                                :key="componentGrid"
                            ></CertificationFilter>
                        </v-tab-item>

                        <v-tab-item>
                            <CertificationFilter
                                :statusCode="certificate"
                                :organizacionId="organizacionId"
                                :key="componentGrid"
                            ></CertificationFilter>
                        </v-tab-item>

                        <v-tab-item>
                            <CertificationFilter
                                :statusCode="rejected"
                                :organizacionId="organizacionId"
                                :key="componentGrid"
                            ></CertificationFilter>
                        </v-tab-item>
                    </v-tabs-items>
                </v-card>
            </div>
        </BaseCardViewComponent>
    </div>
</template>
