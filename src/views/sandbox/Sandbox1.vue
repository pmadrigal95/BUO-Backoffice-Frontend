<script>
/**
 * Descripción: Pantalla  Sandbox 1
 *
 */

const BaseCustomsButtonsGrid = () =>
    import('@/components/core/grids/BaseCustomsButtonsGrid');

const BaseBasicCardViewComponent = () =>
    import(
        '@/views/dashboard/components/shared/card/BaseBasicCardViewComponent'
    );

export default {
    name: 'sandbox',

    components: {
        BaseCustomsButtonsGrid,
        BaseBasicCardViewComponent,
    },
};
</script>

<template>
    <v-row>
        <v-col cols="12">
            <BaseBasicCardViewComponent title="Vacantes abiertas">
                <section slot="top-actions">
                    <BaseCustomsButtonsGrid
                        icon="mdi-plus"
                        :outlined="false"
                        label="Abrir vacantes"
                        :fnMethod="() => {}"
                    />
                </section>
                <section slot="card-text">
                    <span>1</span>
                </section>
            </BaseBasicCardViewComponent>
        </v-col>
        <v-col cols="12">
            <v-layout align-center justify-center class="d-flex flex-column">
                <v-progress-circular
                    :width="10"
                    size="111"
                    :value="82"
                    color="blue-grey"
                >
                    <span class="BUO-Paragraph-Small-SemiBold grey700--text"
                        >82%</span
                    >
                </v-progress-circular>
                <span class="BUO-Label-XSmall-SemiBold grey700--text pt-3"
                    >Coincidencia</span
                >
            </v-layout>
        </v-col>

        <v-col cols="12">
            <v-layout align-center justify-center class="d-flex flex-row">
                <v-progress-circular
                    :width="8"
                    size="40"
                    :value="82"
                    color="blue-grey"
                />
                <section class="ml-4">
                    <div class="BUO-Label-Small-SemiBold grey700--text">
                        Coincidencia
                    </div>
                    <div class="BUO-Label-Small grey700--text">99%</div>
                </section>
            </v-layout>
        </v-col>

        <v-col cols="12">
            <v-list dense color="transparent">
                <v-list-item>
                    <v-list-item-icon class="mr-3">
                        <v-icon color="greenA800"
                            >mdi-checkbox-marked-circle</v-icon
                        >
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title
                            class="BUO-Label-XSmall-SemiBold grey700--text"
                            >Título Universitario</v-list-item-title
                        >
                    </v-list-item-content>
                </v-list-item>

                <v-list-item>
                    <v-list-item-icon class="mr-3">
                        <v-icon color="grey500">mdi-close-circle</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title
                            class="BUO-Label-XSmall-SemiBold grey700--text"
                            >Certificación de Manejo de Dataview Software, nivel
                            4</v-list-item-title
                        >
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-col>

        <v-col cols="12">
            <v-card flat color="grey200" class="rounded-xxl">
                <v-card-text>
                    <v-list-item>
                        <v-list-item-icon class="ma-auto">
                            <BaseSwitch />
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title
                                class="BUO-Paragraph-Medium-SemiBold grey700--text"
                                >Certificación ISO 9001 Solicitará confirmación
                                de la certificación</v-list-item-title
                            >
                        </v-list-item-content>
                        <v-list-item-action>
                            <v-btn icon>
                                <v-icon color="black">mdi-close-circle</v-icon>
                            </v-btn>
                        </v-list-item-action>
                    </v-list-item>
                </v-card-text>
            </v-card>
            <br />
            <v-card flat color="grey200" class="rounded-xxl">
                <v-card-text>
                    <v-list-item two-line>
                        <v-list-item-content>
                            <v-list-item-title
                                class="BUO-Paragraph-Medium-SemiBold grey700--text"
                                >Correo electrónico
                            </v-list-item-title>
                            <v-list-item-subtitle
                                class="BUO-Label-Small grey600--text"
                                >Solicitar el correo electrónico del
                                candidato.</v-list-item-subtitle
                            >
                        </v-list-item-content>
                    </v-list-item>
                </v-card-text>
            </v-card>

            <br />

            <v-card flat class="rounded-xxl">
                <v-card-text>
                    <BaseCustomsButtonsGrid
                        :dark="false"
                        color="redError600"
                        icon="mdi-delete-outline"
                        :outlined="false"
                        label="Cerrar vacante"
                        :fnMethod="() => {}"
                    />
                </v-card-text>
            </v-card>

            <br />

            <v-card flat class="rounded-xxl">
                <v-card-text>
                    <v-card flat color="grey200" class="rounded-xxl">
                        <v-card-text>
                            <h1
                                class="BUO-Paragraph-Small grey700--text text-center"
                            >
                                Una vez que los candidatos completen el proceso
                                los resultados aparecerán aca.
                            </h1>
                        </v-card-text>
                    </v-card>
                </v-card-text>
            </v-card>
        </v-col>

        <v-col cols="12">
            <v-card flat color="grey200" class="rounded-xxl">
                <v-card-text>
                    <v-list-item two-line>
                        <v-list-item-icon class="ma-auto">
                            <BaseSwitch />
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title
                                class="BUO-Paragraph-Medium-SemiBold grey700--text ml-2"
                                >Riesgo</v-list-item-title
                            >
                            <v-list-item-subtitle
                                class="BUO-Label-Small grey600--text"
                                ><v-slider
                                    :value="60"
                                    color="primary"
                                    track-color="grey"
                                    always-dirty
                                    class="slider"
                            /></v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>
