<script>
/**
 * Descripción: Instrucciones del modulo
 *
 * @displayName HelperViewComponent
 *
 */

export default {
    name: 'HelperViewComponent',

    methods: {
        $_open() {
            this.$refs.popUp.$_openModal();
        },
    },
};
</script>

<template>
    <div>
        <!-- @Componente:  BaseDialog-->
        <BasePopUp
            ref="popUp"
            :maxWidth="$vuetify.breakpoint.mobile ? '100%' : '35%'"
            :isDrawer="false"
            scrollable
        >
            <div slot="Content">
                <v-card flat>
                    <v-card-title class="BUO-Heading-Small blue900--text"
                        >Módulo Asignaciones</v-card-title
                    >
                    <v-card-text class="black--text">
                        <div class="pb-4">
                            Para continuar con el proceso debe tomar en cuenta
                            lo siguiente:
                        </div>
                        <div>
                            <v-expansion-panels multiple flat>
                                <v-expansion-panel>
                                    <v-expansion-panel-header
                                        >Crear nuevo
                                        Indicador</v-expansion-panel-header
                                    >
                                    <v-expansion-panel-content>
                                        Hola
                                    </v-expansion-panel-content>
                                </v-expansion-panel>
                                <v-expansion-panel>
                                    <v-expansion-panel-header
                                        >Asignar Indicador
                                        existente</v-expansion-panel-header
                                    >
                                    <v-expansion-panel-content>
                                        Hola
                                    </v-expansion-panel-content>
                                </v-expansion-panel>
                                <v-expansion-panel>
                                    <v-expansion-panel-header
                                        >Asignación
                                        masiva</v-expansion-panel-header
                                    >
                                    <v-expansion-panel-content>
                                        Hola
                                    </v-expansion-panel-content>
                                </v-expansion-panel>
                            </v-expansion-panels>
                        </div>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn
                            class="mt-5 no-uppercase rounded-lg BUO-Paragraph-Small-SemiBold"
                            elevation="0"
                            color="primary"
                            block
                            @click="$_open"
                            >Entendido
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </div>
        </BasePopUp>

        <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                    fab
                    dark
                    x-small
                    class="mr-1"
                    elevation="0"
                    color="primary"
                    @click="$_open"
                    v-bind="attrs"
                    v-on="on"
                >
                    <v-icon dark> mdi-progress-question </v-icon>
                </v-btn>
            </template>
            <span>Ayuda</span>
        </v-tooltip>
    </div>
</template>
