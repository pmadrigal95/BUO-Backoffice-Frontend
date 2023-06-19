<script>
/**
 * Descripción: Instrucciones del modulo
 *
 * @displayName HelperViewComponent
 *
 */

import { mapGetters } from 'vuex';

export default {
    name: 'HelperViewComponent',

    methods: {
        $_open() {
            this.$refs.popUp.$_openModal();
        },
    },

    computed: { ...mapGetters('theme', ['app']) },
};
</script>

<template>
    <section>
        <!-- @Componente:  BaseDialog-->
        <BasePopUp
            ref="popUp"
            :maxWidth="$vuetify.breakpoint.mobile ? '100%' : '35%'"
            :isDrawer="false"
            scrollable
        >
            <div slot="Content">
                <v-card flat>
                    <v-card-title
                        class="BUO-Heading-Small"
                        :class="[
                            app ? 'blueProgress600--text' : 'blue900--text',
                        ]"
                        >Módulo Asignaciones</v-card-title
                    >
                    <v-card-text
                        :class="[app ? 'white--text' : 'grey700--text']"
                    >
                        <section class="pb-4">
                            Para continuar con el proceso debe tomar en cuenta
                            lo siguiente:
                        </section>
                        <section>
                            <v-expansion-panels flat>
                                <v-expansion-panel>
                                    <v-expansion-panel-header
                                        ><span
                                            class="BUO-Paragraph-Large"
                                            :class="[
                                                app
                                                    ? 'blueProgress600--text'
                                                    : 'blue900--text',
                                            ]"
                                            >Crear nuevo Indicador</span
                                        >
                                    </v-expansion-panel-header>
                                    <v-expansion-panel-content>
                                        <section
                                            class="BUO-Label-Small grey500--text"
                                        >
                                            <p>
                                                El indicador debe tener un
                                                nombre único para evitar
                                                confusiones entre indicadores.
                                            </p>
                                            <p>
                                                El proceso crea un indicador
                                                nuevo y no verifica si ya existe
                                                otro con el mismo nombre.
                                            </p>
                                        </section>
                                    </v-expansion-panel-content>
                                </v-expansion-panel>
                                <v-expansion-panel>
                                    <v-expansion-panel-header
                                        ><span
                                            class="BUO-Paragraph-Large"
                                            :class="[
                                                app
                                                    ? 'blueProgress600--text'
                                                    : 'blue900--text',
                                            ]"
                                            >Asignar Indicador existente
                                        </span></v-expansion-panel-header
                                    >
                                    <v-expansion-panel-content>
                                        <div
                                            class="BUO-Label-Small grey500--text"
                                        >
                                            Si el indicador ya había sido
                                            asignado a la persona anteriormente,
                                            el proceso va a actualizar la fecha
                                            y el estado seleccionado, es decir,
                                            el indicador se actualiza con la
                                            fecha y el estado actual.
                                        </div>
                                    </v-expansion-panel-content>
                                </v-expansion-panel>
                                <v-expansion-panel>
                                    <v-expansion-panel-header
                                        ><span
                                            class="BUO-Paragraph-Large"
                                            :class="[
                                                app
                                                    ? 'blueProgress600--text'
                                                    : 'blue900--text',
                                            ]"
                                            >Asignación masiva</span
                                        ></v-expansion-panel-header
                                    >
                                    <v-expansion-panel-content>
                                        <div
                                            class="BUO-Label-Small grey500--text"
                                        >
                                            <p>
                                                Debe seleccionar si desea crear
                                                un indicador o asignar uno
                                                existente. Esta opción aplica
                                                para TODAS las personas.
                                            </p>
                                            <p>
                                                Si es administradora de empresa,
                                                aplica el proceso a TODAS las
                                                personas de la empresa.
                                            </p>
                                            <p>
                                                Si es administradora de
                                                departamento aplica a TODAS las
                                                personas bajo su supervisión.
                                            </p>
                                        </div>
                                    </v-expansion-panel-content>
                                </v-expansion-panel>
                            </v-expansion-panels>
                        </section>
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
    </section>
</template>
