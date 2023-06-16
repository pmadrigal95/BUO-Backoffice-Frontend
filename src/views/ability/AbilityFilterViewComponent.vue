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

const BaseCardViewComponent = () =>
    import('@/components/core/cards/BaseCardViewComponent');

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
        BaseCardViewComponent,
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

        /**
         * Configuracion BaseInputDataTable
         */
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

        /**
         * Configuracion BaseServerDataTable
         */
        setting() {
            return {
                endpoint: this.entity.categoriaId
                    ? `cualificacion/findByDeep/${this.entity.categoriaId}`
                    : 'cualificacion/findBy',
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
                        text: 'Interna',
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
                                'CompanyDashboardViewComponent',
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
            };
        },

        write() {
            const result = baseSecurityHelper.$_ReadPermission(
                'AbilityViewComponent',
                baseSecurityHelper.$_write
            );
            return result;
        },

        extraParams() {
            let array = [];
            if (this.user.companyId != this.buoId && !this.organizacionId) {
                array.push({
                    name: 'organizacionId',
                    value: this.user.companyId,
                });
            } else if (this.organizacionId) {
                array.push({
                    name: 'organizacionId',
                    value: this.organizacionId,
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
    <div v-if="organizacionId">
        <v-row v-show="show" class="pb-1">
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
                                <BaseInputTreeview
                                    label="Categoría"
                                    v-model.number="entity.categoriaId"
                                    :readonly="!entity.organizacionId"
                                    itemText="nombre"
                                    itemChildren="subCategorias"
                                    :endpoint="`categoria/findAllTree/${entity.organizacionId}`"
                                    :validate="['requiered']"
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
        <BaseServerDataTable
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
    </div>
    <BaseCardViewComponent title="Indicadores" v-else>
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
                            <v-row dense>
                                <v-col cols="12">
                                    <p
                                        class="BUO-Paragraph-Large-SemiBold"
                                        :class="[
                                            app
                                                ? 'white--text'
                                                : 'grey700--text',
                                        ]"
                                    >
                                        Seleccione la categoría
                                    </p>
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
        </div>
        <div slot="body">
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
        </div>
    </BaseCardViewComponent>
</template>
