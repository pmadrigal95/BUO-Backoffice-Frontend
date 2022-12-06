<script>
/**
 * Descripción: Pantalla Filtro Codigo Promocionales
 *
 * @displayName PromotionalCodesEditorFilterViewComponent
 */

const BaseDatePicker = () => import('@/components/core/forms/BaseDatePicker');

export default {
    name: 'PromotionalCodesFilterViewComponent',

    components: {
        BaseDatePicker,
    },
    data() {
        return {
            params: this.$_Object(),
        };
    },
    computed: {
        /**
         * Configuracion BaseServerDataTable
         */
    },

    methods: {
        $_Object() {
            return {
                id: undefined,
                code: undefined,
                dateExpiry: undefined,
                product: undefined,
                discontAmount: undefined,
                discontRate: undefined,
                maxUse: undefined,
            };
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
                                        <BaseSwitch
                                            label="Es Licencia"
                                        ></BaseSwitch>
                                        <BaseDatePicker
                                            label="Fecha de expiración"
                                            appendIcon="mdi-magnify"
                                            v-model="params.dateExpiry"
                                        />
                                        <BaseInput
                                            label="Uso Máximo"
                                            v-model="params.maxUse"
                                            type="number"
                                            :validate="['number']"
                                        />
                                        <BaseSwitch
                                            label="Compra Gratis"
                                        ></BaseSwitch>
                                        <BaseInput
                                            label="Monto Descuento"
                                            v-model="params.discontAmount"
                                            type="number"
                                            :validate="['number']"
                                        />
                                        <BaseInput
                                            label="Porcentaje Descuento"
                                            type="number"
                                            :validate="['number']"
                                        />
                                        <BaseSwitch label="Estado"></BaseSwitch>
                                    </v-col>
                                </v-row>
                            </div>
                        </BaseForm>
                    </v-card-text>
                </v-card>
            </div>
        </BasePopUp>
    </div>
</template>
