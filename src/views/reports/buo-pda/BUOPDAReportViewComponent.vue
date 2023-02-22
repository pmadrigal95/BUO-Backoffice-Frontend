<script>
/**
 * Descripción: Pantalla Filtro Codigo Promocionales
 *
 * @displayName BUOPDAReportViewComponent
 *
 */

const BaseCardViewComponent = () =>
    import('@/components/core/cards/BaseCardViewComponent');

export default {
    name: 'BUOPDAReportViewComponent',

    components: {
        BaseCardViewComponent,
    },

    data() {
        return {
            entity: this.$_Object(),
        };
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

        $_sendToApi() {
            alert('Hola');
        },
    },
};
</script>

<template>
    <BaseCardViewComponent title="Generador de Reporte Buo-PDA">
        <div slot="card-text">
            <v-row dense>
                <v-col cols="12" md="6">
                    <BaseForm
                :block="$vuetify.breakpoint.mobile"
                labelBtn="Buscar"
                :method="$_sendToApi"
            >
                <div slot="body">
                    <v-row dense>
                        <v-col cols="12">
                            <BaseInputDataTable
                                label="Empresa"
                                :setting="companySetting"
                                v-model.number="entity.organizacionId"
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
                    </BaseForm>
                </v-col>
            </v-row>
        </div>
    </BaseCardViewComponent>
</template>
