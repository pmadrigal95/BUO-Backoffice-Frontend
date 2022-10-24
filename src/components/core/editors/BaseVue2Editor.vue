<script>
/**
 * Descripción: Componente BaseVue2Editor
 *
 * Herramienta para construir / editar un elemento HTML
 *
 * @displayName BaseVue2Editor
 */

import { VueEditor } from 'vue2-editor';

export default {
    name: 'BaseVue2Editor',

    inheritAttrs: false,

    props: {
        /**
         * Elementos del toolBar
         * doc: https://github.com/davidroyer/vue2-editor/blob/master/src/helpers/default-toolbar.js
         */
        customToolbar: {
            type: Array,
            default: () => [
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
                ['link', 'image', 'video'],
                ['clean'], // remove formatting button
            ],
        },

        /**
         * V-model
         */
        value: {
            type: [String, Number],
        },
    },

    components: {
        VueEditor,
    },

    computed: {
        listeners() {
            return {
                ...this.$listeners,
                input: this.$_updateValue,
            };
        },
    },

    /**
     * Metodos
     */
    methods: {
        $_updateValue(event) {
            this.$emit('input', event);
        },
    },
};
</script>

<template>
    <vue-editor
        :editorToolbar="customToolbar"
        :value="value"
        @input="$_updateValue"
        v-bind="$attrs"
        v-on="listeners"
    />
</template>
