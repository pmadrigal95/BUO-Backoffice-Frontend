<script>
/**
 * Descripción: Pantalla Pruebas
 *
 * @displayName AssessmentReviewViewComponent
 */

import { Container, Draggable } from 'vue-smooth-dnd';

const BaseSimpleTextEditor = () =>
    import('@/components/core/editors/BaseSimpleTextEditor.vue');

const BaseVue2Editor = () =>
    import('@/components/core/editors/BaseVue2Editor.vue');

const BasePopUpVue2Editor = () =>
    import('@/components/core/editors/BasePopUpVue2Editor.vue');

export default {
    name: 'AssessmentReviewViewComponent',

    inheritAttrs: false,

    components: {
        Draggable,
        Container,
        BaseSimpleTextEditor,
        BaseVue2Editor,
        BasePopUpVue2Editor,
    },

    data() {
        return {
            html: undefined,
            html2: 'undefined',
            html3: 'undefined',
            panel: [],
        };
    },

    computed: {
        /**
         * Config Menú editor Html
         */
        customToolbar() {
            return [
                [{ header: [false, 1, 2, 3, 4, 5, 6] }],
                ['bold', 'italic', 'underline', 'strike'], // toggled buttons
                [
                    { align: '' },
                    { align: 'center' },
                    { align: 'right' },
                    { align: 'justify' },
                ],
                ['blockquote', 'code-block'],
                [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
                [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
                [{ color: [] }, { background: [] }], // dropdown with defaults from theme
                ['link'],
                ['clean'], // remove formatting button
            ];
        },

        preguntas() {
            return [
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
            ];
        },
    },
};
</script>

<template>
    <section>
        <v-card flat>
            <v-card-text>
                <v-row align="center" justify="center">
                    <v-col cols="12">
                        <BaseVue2Editor
                            v-model="html"
                            :customToolbar="customToolbar"
                        />
                        <section>
                            <h1>Resultado:</h1>
                            <div v-html="html" />
                        </section>
                        <hr />
                    </v-col>
                    <v-col cols="12">
                        <BaseSimpleTextEditor type="subtitle" v-model="html2" />
                        <hr />
                    </v-col>

                    <v-col cols="12">
                        <BasePopUpVue2Editor
                            :customToolbar="customToolbar"
                            type="popUp"
                            v-model="html3"
                        />
                        <hr />
                    </v-col>

                    <v-col cols="12">
                        <BasePopUpVue2Editor
                            :customToolbar="customToolbar"
                            v-model="html3"
                        />
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
        <br />
        <v-card flat width="100%" height="100%">
            <v-card-text>
                <v-expansion-panels flat focusable multiple>
                    <div v-if="preguntas.length > 0">
                        <Container>
                            <Draggable
                                v-for="pregunta in preguntas"
                                :key="pregunta.orden"
                            >
                                <v-expansion-panel hide-actions flat>
                                    <v-expansion-panel-header>
                                        <v-row
                                            align="center"
                                            class="spacer"
                                            no-gutters
                                        >
                                            <v-col cols md="1">
                                                <!-- @Icono de Topics -->
                                                <v-icon color="red"
                                                    >mdi-comment-question</v-icon
                                                >
                                            </v-col>
                                            <v-col cols md="9">
                                                <!-- @Editor HTML de Preguntas -->
                                                <BasePopUpVue2Editor
                                                    :customToolbar="
                                                        customToolbar
                                                    "
                                                    type="popUp"
                                                    v-model="pregunta.textoHtml"
                                                />
                                            </v-col>
                                            <v-col cols md="2">
                                                <!-- @total de respuestas -->
                                                <v-layout align-end justify-end>
                                                    <!-- @Editar Pregunta -->
                                                    <v-tooltip bottom>
                                                        <template
                                                            v-slot:activator="{
                                                                on,
                                                            }"
                                                        >
                                                            <v-btn
                                                                v-on="on"
                                                                class="ma-2"
                                                                icon
                                                                color="success"
                                                            >
                                                                <v-icon
                                                                    >mdi-circle-edit-outline</v-icon
                                                                >
                                                            </v-btn>
                                                        </template>
                                                        <span>Editar</span>
                                                    </v-tooltip>
                                                    <!-- @Eliminar Pregunta -->
                                                    <v-tooltip bottom>
                                                        <template
                                                            v-slot:activator="{
                                                                on,
                                                            }"
                                                        >
                                                            <v-btn
                                                                v-on="on"
                                                                class="ma-2"
                                                                icon
                                                            >
                                                                <v-icon
                                                                    color="red"
                                                                    >mdi-trash-can-outline</v-icon
                                                                >
                                                            </v-btn>
                                                        </template>
                                                        <span>Eliminar</span>
                                                    </v-tooltip>
                                                </v-layout>
                                            </v-col>
                                        </v-row>
                                    </v-expansion-panel-header>

                                    <v-expansion-panel-content>
                                        <v-divider></v-divider>
                                        <v-card-text>
                                            <!-- @Tiene lista de Respuestas -->
                                            <!-- @DnD de Respuestas -->
                                            <div
                                                v-if="
                                                    pregunta.respuestas &&
                                                    pregunta.respuestas.length >
                                                        0
                                                "
                                            >
                                                <Container>
                                                    <Draggable
                                                        v-for="respuesta in pregunta.respuestas"
                                                        :key="respuesta.orden"
                                                    >
                                                        <v-row
                                                            align="center"
                                                            class="spacer"
                                                            no-gutters
                                                        >
                                                            <v-col cols md="1">
                                                                <!-- @Icono de Topics -->
                                                                <v-icon
                                                                    color="red"
                                                                    >mdi-format-list-checkbox</v-icon
                                                                >
                                                            </v-col>
                                                            <v-col cols md="9">
                                                                <!-- @Editor de Respuestas -->
                                                                <BaseSimpleTextEditor
                                                                    type="subtitle"
                                                                    v-model="
                                                                        respuesta.texto
                                                                    "
                                                                />
                                                                <!--AQUI-->
                                                            </v-col>
                                                        </v-row>
                                                    </Draggable>
                                                </Container>
                                            </div>
                                            <div v-else>
                                                <!-- @No lista de Respuestas -->
                                                <v-alert
                                                    dense
                                                    text
                                                    type="error"
                                                >
                                                    {{ validation }}
                                                </v-alert>
                                            </div>
                                        </v-card-text>
                                    </v-expansion-panel-content>
                                </v-expansion-panel>
                            </Draggable>
                        </Container>
                    </div>
                </v-expansion-panels>
            </v-card-text>
        </v-card>
    </section>
</template>

<style scoped>
.v-expansion-panels {
    display: block !important;
}
</style>
