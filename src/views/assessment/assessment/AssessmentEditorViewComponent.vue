<script>
/**
 * Descripción: Pantalla Pruebas
 *
 * @displayName AssessmentEditorViewComponent
 */

const BaseSimpleTextEditor = () =>
    import('@/components/core/editors/BaseSimpleTextEditor.vue');

const BaseVue2Editor = () =>
    import('@/components/core/editors/BaseVue2Editor.vue');

const BasePopUpVue2Editor = () =>
    import('@/components/core/editors/BasePopUpVue2Editor.vue');

export default {
    name: 'AssessmentEditorViewComponent',

    components: {
        BaseSimpleTextEditor,
        BaseVue2Editor,
        BasePopUpVue2Editor,
    },

    data() {
        return {
            html: undefined,
            html2: 'undefined',
            html3: 'undefined',
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
    },
};
</script>

<template>
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
</template>
