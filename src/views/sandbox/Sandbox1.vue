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
                        <!-- <v-list-item-action>
                            <span
                                class="BUO-Paragraph-Medium-SemiBold grey700--text"
                                >60%</span
                            >
                        </v-list-item-action> -->
                    </v-list-item>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>

<style scoped>
.slider >>> .v-slider__track-container {
    -webkit-appearance: none !important;
    width: 100% !important;
    height: 10px !important;
    outline: none !important;
    opacity: 0.8 !important;
}

.slider >>> .v-slider__track-fill {
    border-radius: 10px 0px 0px 10px !important;
}

.slider >>> .v-slider__track-background {
    border-radius: 10px 10px 10px 10px !important;
}

.slider >>> .v-slider__thumb {
    -webkit-appearance: none !important;
    appearance: none !important;
    width: 26px !important;
    height: 26px !important;
    border-radius: 100% !important;
    cursor: pointer !important;
}

.slider >>> .v-slider__thumb::before {
    transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
    content: '';
    color: inherit;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: currentColor;
    opacity: 0.3;
    position: absolute;
    left: -6px;
    top: -8px;
    transform: scale(0.1);
    pointer-events: none;
}
</style>
