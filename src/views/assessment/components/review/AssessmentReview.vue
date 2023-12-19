<script>
/**
 * Descripción: Pantalla Pruebas
 *
 * @displayName AssessmentReviewViewComponent
 */

const HeaderAssessmentView = () =>
    import('@/views/assessment/components/review/display/HeaderAssessmentView');

const TemplateAssessmentView = () =>
    import(
        '@/views/assessment/components/review/display/TemplateAssessmentView'
    );

export default {
    name: 'AssessmentReview',

    props: {
        entity: {
            type: Object,
            requiered: true,
        },
    },

    components: {
        HeaderAssessmentView,
        TemplateAssessmentView,
    },

    data() {
        return {
            assessment: undefined,
        };
    },

    created() {
        this.assessment = this.$_Object();
    },

    methods: {
        /**
         * Entity Object
         */
        $_setStepper() {
            return {
                headerStep: 0,
                assessmentStep: 0,
            };
        },

        /**
         * Entity Object
         */
        $_setComponentkey() {
            return {
                headerKey: 0,
                assessmentKey: 0,
            };
        },

        $_Object() {
            return {
                header: this.entity,
                template: [
                    {
                        id: 1,
                        textoHtml: 'Pregunta1',
                        orden: 1,
                        respuestas: [
                            {
                                id: 1,
                                texto: 'RespuestaA',
                                valor: 1,
                                orden: 1,
                            },
                            {
                                id: 1,
                                texto: 'RespuestaB',
                                valor: 0,
                                orden: 2,
                            },
                            {
                                id: 1,
                                texto: 'RespuestaC',
                                valor: 2,
                                orden: 3,
                            },
                            {
                                id: 1,
                                texto: 'RespuestaD',
                                valor: 5,
                                orden: 4,
                            },
                        ],
                    },
                    {
                        id: 2,
                        textoHtml: 'Pregunta2',
                        orden: 2,
                        respuestas: [
                            {
                                id: 1,
                                texto: 'RespuestaA',
                                valor: 1,
                                orden: 1,
                            },
                            {
                                id: 1,
                                texto: 'RespuestaB',
                                valor: 2,
                                orden: 2,
                            },
                            {
                                id: 1,
                                texto: 'RespuestaC',
                                valor: 5,
                                orden: 3,
                            },
                            {
                                id: 1,
                                texto: 'RespuestaD',
                                valor: 0,
                                orden: 4,
                            },
                        ],
                    },
                ],
                step: this.$_setStepper(),
                key: this.$_setComponentkey(),
            };
        },
    },
};
</script>

<template>
    <div v-if="assessment">
        <v-card flat class="rounded-t-xl">
            <v-card-text>
                <section>
                    <v-window v-model="assessment.step.headerStep" touchless>
                        <v-window-item :value="0">
                            <HeaderAssessmentView :entity="assessment" />
                        </v-window-item>

                        <v-window-item :value="1">
                            <p>Hola 2</p>
                        </v-window-item>
                    </v-window>
                </section>
            </v-card-text>
        </v-card>

        <v-card flat class="rounded-lg mt-6">
            <v-card-text>
                <section>
                    <v-window
                        v-model="assessment.step.assessmentStep"
                        touchless
                    >
                        <v-window-item :value="0">
                            <TemplateAssessmentView />
                        </v-window-item>

                        <v-window-item :value="1" :key="entity.componentKey">
                            <p>Hola 2</p>
                        </v-window-item>
                    </v-window>
                </section>
            </v-card-text>
        </v-card>
    </div>
</template>
