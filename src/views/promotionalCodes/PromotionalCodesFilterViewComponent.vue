<script>
/**
 * Descripción: Pantalla Filtro Codigo Promocionales
 *
 * @displayName PromotionalCodesFilterViewComponent
 */

const BaseCardViewComponent = () =>
    import('@/components/core/cards/BaseCardViewComponent');

const BaseServerDataTable = () =>
    import('@/components/core/grids/BaseServerDataTable.vue');

const BaseDatePicker = () => import('@/components/core/forms/BaseDatePicker');

export default {
    name: 'PromotionalCodesFilterViewComponent',

    components: {
        BaseCardViewComponent,
        BaseServerDataTable,
        BaseDatePicker,
    },
    data() {
        return {
            params: this.$_Object(),
            select: { product: 'Prueba PDA', value: '2' },
            products: [
                { product: 'Tokens', value: 1 },
                { product: 'Prueba PDA', value: 2 },
            ],
        };
    },
    computed: {
        setting() {
            return {
                endpoint: 'codigoPromocion/findBy',
                columns: [
                    {
                        text: 'Código',
                        align: 'start',
                        value: 'codigo',
                        show: true,
                    },
                    {
                        text: 'Nombre Producto',
                        align: 'start',
                        value: 'nombreProducto',
                        show: true,
                    },
                    {
                        text: 'Monto Descuento',
                        align: 'start',
                        value: 'montoDescuento',
                        show: true,
                    },
                    {
                        text: 'Estado',
                        align: 'start',
                        value: 'estadoId',
                        show: true,
                    },
                ],
                key: 'id',
            };
        },
    },

    methods: {
        $_Object() {
            return {
                id: undefined,
                code: undefined,
                dateExpiry: undefined,
                product: 2,
                discontAmount: undefined,
                discontRate: undefined,
                maxUse: undefined,
                license: undefined,
                buyFree: undefined,
                condition: undefined,
            };
        },

        $_fnNew() {
            alert('Soy nuevo!');
        },
        $_fnEdit(row) {
            alert(`Hola soy: ${row.selected.id}`);
        },
        $_fnDelete(id) {
            alert(`Hola soy: ${id}`);
        },
        $_open() {
            this.$refs['popUp'].$_openModal();
        },
    },
};
</script>

<template>
    <div>
        <BasePopUp
            ref="popUp"
            :maxWidth="$vuetify.breakpoint.mobile ? '100%' : '600'"
            scrollable
            :isDrawer="true"
        >
            <div slot="Content">
                <v-card flat height="100%" width="100%">
                    <v-card-title>Realizar Código Promocional</v-card-title>
                    <v-card-text>
                        <BaseForm :method="$_fnNew">
                            <div slot="body">
                                <v-row>
                                    <v-col cols="12" md="12">
                                        <BaseInput
                                            label="Código"
                                            v-model="params.code"
                                            :max="6"
                                            :min="3"
                                            :validate="['range']"
                                        />
                                        <BaseSelect
                                            label="Producto"
                                            v-model="params.product"
                                            :endpoint="products"
                                            itemText="product"
                                            itemValue="value"
                                            readonly
                                        ></BaseSelect>
                                        <BaseSwitch
                                            label="Es Licencia"
                                            v-model="params.license"
                                        ></BaseSwitch>
                                        <BaseDatePicker
                                            label="Fecha de expiración"
                                            appendIcon="mdi-magnify"
                                            v-model="params.dateExpiry"
                                            v-if="!params.license"
                                        />
                                        <BaseInput
                                            label="Uso Máximo"
                                            v-model="params.maxUse"
                                            type="number"
                                            :validate="['number']"
                                            v-if="params.license"
                                        />
                                        <BaseSwitch
                                            label="Compra Gratis"
                                            v-model="params.buyFree"
                                        ></BaseSwitch>
                                        <BaseInput
                                            label="Monto Descuento"
                                            v-model="params.discontAmount"
                                            type="number"
                                            :validate="['number']"
                                            v-if="!params.buyFree"
                                        />
                                        <BaseInput
                                            label="Porcentaje Descuento"
                                            type="number"
                                            v-model="params.discontRate"
                                            :validate="['number']"
                                            v-if="!params.buyFree"
                                        />
                                        <BaseSwitch
                                            v-model="params.condition"
                                            :label="
                                                params.condition
                                                    ? 'Activo'
                                                    : 'Inactivo'
                                            "
                                        ></BaseSwitch>
                                    </v-col>
                                </v-row>
                            </div>
                        </BaseForm>
                    </v-card-text>
                </v-card>
            </div>
        </BasePopUp>
        <BaseCardViewComponent title="Códigos Promocionales">
            <div slot="card-text">
                <!--Componente Editor -->
                <BaseServerDataTable
                    ref="PromotionalCodesFilter"
                    :setting="setting"
                    :fnNew="$_open"
                    :fnEdit="$_fnEdit"
                    :fnDelete="$_fnDelete"
                />
            </div>
        </BaseCardViewComponent>
    </div>
</template>
