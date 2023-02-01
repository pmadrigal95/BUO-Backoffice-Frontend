<script>
/**
 * Descripción: Input File reutilizable
 *
 * @displayName BaseInputFile
 */

import { mask } from 'vue-the-mask';

//import extensions from '@/helpers/baseExtensionsFile.js';

export default {
    name: 'BaseInputFile',

    directives: { mask },

    inheritAttrs: false,

    props: {
        /**
         * Agrega icono al componente
         * No Requerido
         */
        appendIcon: {
            type: String,
            default: undefined,
        },

        /**
         * Agrega un icono al exterior de la entrada del componente
         * No Requerido
         */
        appendOuterIcon: {
            type: String,
            default: undefined,
        },

        /**
         * Habilita el enfoque automático
         * No Requerido
         */
        autofocus: {
            type: Boolean,
            default: false,
        },

        /**
         * Cambia el color de fondo de la entrada.
         * No Requerido
         */
        backgroundColor: {
            type: String,
            default: undefined,
        },

        /**
         * Cambia la visualización de las fichas
         * No Requerido
         */
        chips: {
            type: Boolean,
            default: false,
        },

        /**
         * Se usa cuando el input esta sucio
         * No Requerido
         */
        clearIcon: {
            type: String,
            default: '$clear',
        },

        /**
         * Agregar funcionalidad clara de entrada, el ícono predeterminado es Material Design Icons mdi-clear
         * No Requerido
         */
        clearable: {
            type: Boolean,
            default: true,
        },

        /**
         * Aplica el color especificado al control
         * No Requerido
         */
        color: {
            type: String,
            default: undefined,
        },

        /**
         * Crea un contador para la longitud de entrada
         * No Requerido
         */
        counter: {
            type: [Boolean, Number, String],
            default: undefined,
        },

        /**
         * El texto que se muestra al usar el counter y el tamaño de espectáculo
         * No Requerido
         */
        counterSizeString: {
            type: String,
            default: '$vuetify.fileInput.counterSize',
        },

        /**
         * El texto que se muestra cuando se usa el counter prop
         * No Requerido
         */

        counterString: {
            type: String,
            default: '$vuetify.fileInput.counter',
        },

        /**
         *
         * No Requerido
         */
        counterValue: {
            type: Function,
            default: null,
        },

        /**
         * Tema oscuro
         * No Requerido
         */
        dark: {
            type: Boolean,
            default: false,
        },

        /**
         * Reduce la altura del input
         * No Requerido
         */
        dense: {
            type: Boolean,
            default: false,
        },

        /**
         * Desabilita el input
         * No Requerido
         */
        disabled: {
            type: Boolean,
            default: false,
        },

        /**
         * Coloca el input en estado de error
         * No Requerido
         */
        error: {
            type: Boolean,
            default: false,
        },

        /**
         * El número total de errores que deberían mostrarse a la vez
         * No Requerido
         */
        errorCount: {
            type: [Number, String],
            default: 1,
        },

        /**
         * Aplica el estilo de entrada relleno alternativo
         * No Requerido
         */
        filled: {
            type: Boolean,
            default: false,
        },

        /**
         * Aplica el estilo de entrada relleno alternativo
         * No Requerido
         */
        flat: {
            type: Boolean,
            default: false,
        },

        /**
         * Ancho completo
         * No Requerido
         */
        fullWidth: {
            type: Boolean,
            default: false,
        },

        /**
         * Altura al input
         * No Requerido
         */
        height: {
            type: [Number, String],
            default: undefined,
        },

        /**
         * Oculta sugerencias y errores de validación
         * No Requerido
         */
        hideDetails: {
            type: [Boolean, String],
            default: undefined,
        },

        /**
         * Mostrar el icono solo sin la entrada
         * No Requerido
         */
        hideInput: {
            type: Boolean,
            default: false,
        },

        /**
         * Text de sugerencia
         * No Requerido
         */
        hint: {
            type: String,
            default: undefined,
        },

        /**
         * Identificación del componente
         * No Requerido
         */
        id: {
            type: String,
            default: undefined,
        },

        /**
         * Etiqueta de la entrada
         * No Requerido
         */
        label: {
            type: String,
            default: undefined,
        },

        light: {
            type: Boolean,
            default: undefined,
        },

        loaderHeight: {
            type: [Number, String],
            default: 2,
        },

        loading: {
            type: [Boolean, String],
            default: false,
        },

        multiple: {
            type: Boolean,
            default: false,
        },

        outlined: {
            type: Boolean,
            default: false,
        },

        persistentHint: {
            type: Boolean,
            default: false,
        },

        persistentPlaceholder: {
            type: Boolean,
            default: false,
        },

        placeholder: {
            type: String,
            default: undefined,
        },

        prefix: {
            type: String,
            default: undefined,
        },

        prependIcon: {
            type: String,
            default: '$file',
        },

        prependInnerIcon: {
            type: String,
            default: 'undefined',
        },

        reverse: {
            type: Boolean,
            default: false,
        },

        rounded: {
            type: Boolean,
            default: false,
        },

        shaped: {
            type: Boolean,
            default: false,
        },

        showSize: {
            type: [Boolean, Number],
            default: false,
        },

        singleLine: {
            type: Boolean,
            default: false,
        },

        smallChips: {
            type: Boolean,
            default: false,
        },

        solo: {
            type: Boolean,
            default: false,
        },

        soloInverted: {
            type: Boolean,
            default: false,
        },

        success: {
            type: Boolean,
            default: false,
        },

        successMessages: {
            type: [String, Array],
            default: undefined,
        },

        suffix: {
            type: String,
            default: undefined,
        },

        truncateLength: {
            type: [Number, String],
            default: 22,
        },

        trunvalidateOnBlurcateLength: {
            type: Boolean,
            default: false,
        },

        /**
         * V-model
         */
        value: {
            type: String,
        },

        /**
         * Lista de errores
         * No es requerido
         */
        errors: {
            type: String,
            default: null,
        },

        /**
         * Como validar el input
         * ['text'] ['email'] [ @validacionPersonalizada ]
         */
        validate: {
            type: Array,
            required: false,
        },

        /**
         * Caracteres max
         * Default: 100
         */
        max: {
            type: Number,
            default: 100,
        },

        /**
         * Caracteres min
         * Default: 0
         */
        min: {
            type: Number,
            default: 0,
        },

        /**
         * Mask Input
         */
        mask: {
            default: undefined,
        },
    },

    data() {
        return {
            normalRules: [],
            BoolMask: false,
            files: [],
        };
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
     * Validaciones
     */
    created() {},

    /**
     * Metodos click icon
     */
    methods: {
        inputChanged() {
            if (this.file[0].name.endsWith('.xlsx')) {
                alert('excel matched');
            } else {
                alert('not matched');
            }
            /*if (this.ffile[0].type.match('application/vnd.ms-excel')) {
                console.log('excel matched');
            } else {
                console.log('not matched');
            }*/
        },
    },
};
</script>

<template>
    <v-file-input
        v-model="file"
        accept=".xlsx"
        placeholder="Upload your documents"
        label="File input"
        multiple
        prepend-icon="mdi-paperclip"
        @change="inputChanged"
    >
        <template v-slot:selection="{ text }">
            <v-chip small label color="primary">
                {{ text }}
            </v-chip>
        </template>
    </v-file-input>
</template>
