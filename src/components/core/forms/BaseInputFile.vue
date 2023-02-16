<script>
/**
 * Descripción: Input File reutilizable
 *
 * @displayName BaseInputFile
 */
import baseLocalHelper from '@/helpers/baseLocalHelper';

import baseFnFile from '@/helpers/baseFnFile';

export default {
    name: 'BaseInputFile',

    inheritAttrs: false,

    props: {
        /**
         * Agrega icono al componente
         * No Requerido
         */
        appendIcon: {
            type: String,
            default: 'mdi-progress-upload',
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
            default: 'mdi-close-circle',
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
            default: false,
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

        /**
         * Aplica la variante de tema claro al componente.
         * No Requerido
         */
        light: {
            type: Boolean,
            default: undefined,
        },

        /**
         * Especifica la altura del contenedor.
         * No Requerido
         */
        loaderHeight: {
            type: [Number, String],
            default: 2,
        },

        /**
         * Muestra la barra de progreso lineal.
         * No Requerido
         */
        loading: {
            type: [Boolean, String],
            default: false,
        },

        /**
         * Agrega el atributo múltiple al input file.
         * No Requerido
         */
        multiple: {
            type: Boolean,
            default: false,
        },

        /**
         * Aplica el estilo delineado a la entrada.
         * No Requerido
         */
        outlined: {
            type: Boolean,
            default: true,
        },

        /**
         * Forza la sugerencia de estar siempre visible.
         * No Requerido
         */
        persistentHint: {
            type: Boolean,
            default: false,
        },

        /**
         * Obliga al marcador de posición a estar siempre visible.
         * No Requerido
         */
        persistentPlaceholder: {
            type: Boolean,
            default: false,
        },

        /**
         * Establece el texto del marcador de posición de la entrada.
         * No Requerido
         */
        placeholder: {
            type: String,
            default: undefined,
        },

        /**
         * Muestra el texto del prefijo.
         * No Requerido
         */
        prefix: {
            type: String,
            default: undefined,
        },

        /**
         * Antepone un ícono al componente, usa la misma sintaxis que v-icon.
         * No Requerido
         */
        prependIcon: {
            type: String,
            default: '',
        },

        /**
         * Antepone un ícono dentro de la entrada del componente, usa la misma sintaxis que v-icon.
         * No Requerido
         */
        prependInnerIcon: {
            type: String,
            default: '',
        },

        /**
         * Invierte la orientación de entrada.
         * No Requerido
         */
        reverse: {
            type: Boolean,
            default: false,
        },

        /**
         * Agrega un radio de borde a la entrada.
         * No Requerido
         */
        rounded: {
            type: Boolean,
            default: false,
        },

        /**
         * Redondee si está delineado y aumente el radio del borde si está lleno.
         * No Requerido
         */
        shaped: {
            type: Boolean,
            default: false,
        },

        /**
         * Establece el tamaño mostrado de los archivos seleccionados.
         * No Requerido
         */
        showSize: {
            type: [Boolean, Number],
            default: false,
        },

        /**
         * La etiqueta no se mueve en foco / sucio.
         * No Requerido
         */
        singleLine: {
            type: Boolean,
            default: false,
        },

        /**
         * Cambia la visualización de selecciones a fichas con la propiedad pequeña.
         * No Requerido
         */
        smallChips: {
            type: Boolean,
            default: false,
        },

        /**
         * Cambia el estilo de la entrada.
         * No Requerido
         */
        solo: {
            type: Boolean,
            default: false,
        },

        /**
         * Reduce la opacidad del elemento hasta que se enfoca.
         * No Requerido
         */
        soloInverted: {
            type: Boolean,
            default: false,
        },

        /**
         * Pone la entrada en un estado de éxito.
         * No Requerido
         */
        success: {
            type: Boolean,
            default: false,
        },

        /**
         * Pone la entrada en un estado de éxito y pasa a través de mensajes de éxito personalizados.
         * No Requerido
         */
        successMessages: {
            type: [String, Array],
            default: undefined,
        },

        /**
         * Displays suffix text.
         * No Requerido
         */
        suffix: {
            type: String,
            default: undefined,
        },

        /**
         * La longitud de un nombre de archivo antes de que se trunque con puntos suspensivos.
         * No Requerido
         */
        truncateLength: {
            type: [Number, String],
            default: 22,
        },

        /**
         * Retrasa la validación hasta el evento de desenfoque.
         * No Requerido
         */
        validateOnBlur: {
            type: Boolean,
            default: false,
        },

        /**
         * V-model
         */
        value: {
            default: undefined,
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
         * ['text'] [ @validacionPersonalizada ]
         */
        validate: {
            type: Array,
            required: false,
        },

        /**
         * Tipo de extensiones que aceptara el input file
         *
         */
        fileType: {
            type: String,
            required: true,
        },

        /**
         * Ancho de imagenes
         *
         */
        imagesWidth: {
            type: Number,
            default: undefined,
        },

        /**
         * Alto de imagenes
         *
         */
        imagesHeight: {
            type: Number,
            default: undefined,
        },
    },

    data() {
        return {
            normalRules: [],
            accept: '',
            newFile: null,
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
    created() {
        this.$_fnGetExtensionToAccept();

        this.normalRules = [
            (v) =>
                !!v ||
                baseLocalHelper.$_MsgFieldRequired(
                    this.label != undefined ? this.label : ''
                ),
            (v) =>
                (v && baseFnFile.$_isCorrectExtension(v, this.fileType)) ||
                baseLocalHelper.$_MsgFileAllowedExtensionInvalid(
                    this.label != undefined ? this.label : '',
                    baseFnFile.$_extensionsFile[this.fileType].documentType
                ),
            (v) =>
                (v && baseFnFile.$_isCorrectMime(v, this.fileType)) ||
                baseLocalHelper.$_MsgFileAllowedMimeInvalid(
                    this.label != undefined ? this.label : ''
                ),
            (v) =>
                (v && this.fileType === 'imagenes') ||
                baseFnFile.$_isCorrectSize(
                    v,
                    this.imagesWidth,
                    this.imagesHeight
                ) ||
                baseLocalHelper.$_MsgFileAllowedSizeImagesInvalid(
                    this.label != undefined ? this.label : '',
                    this.imagesWidth,
                    this.imagesHeight
                ),
        ];
    },

    methods: {
        $_updateValue(event) {
            this.$emit('input', event);
        },

        async $_passTheBase64() {
            const result = this.newFile
                ? await baseFnFile.$_convertToBase64(this.newFile)
                : undefined;
            this.$_updateValue(result);
        },

        $_fnGetExtensionToAccept() {
            baseFnFile.$_extensionsFile[this.fileType].extension.forEach(
                (type) => (this.accept += `${type},`)
            );
        },
    },
};
</script>

<template>
    <v-file-input
        :append-icon="appendIcon"
        :append-outer-icon="appendOuterIcon"
        :background-color="backgroundColor"
        :chips="chips"
        :clear-icon="clearIcon"
        :clearable="clearable"
        :color="color"
        :counter="counter"
        :counter-size-string="counterSizeString"
        :counter-string="counterString"
        :counter-value="counterValue"
        :dark="dark"
        :dense="dense"
        :disabled="disabled"
        :error="error"
        :error-count="errorCount"
        :filled="filled"
        :flat="flat"
        :full-width="fullWidth"
        :height="height"
        :hide-details="hideDetails"
        :hide-input="hideInput"
        :hint="hint"
        :id="id"
        :label="label"
        :light="light"
        :loader-height="loaderHeight"
        :loading="loading"
        :multiple="multiple"
        :outlined="outlined"
        :persistent-hint="persistentHint"
        :persistent-placeholder="persistentPlaceholder"
        :placeholder="placeholder"
        :prefix="prefix"
        :prepend-icon="prependIcon"
        :prepend-inner-icon="prependInnerIcon"
        :reverse="reverse"
        :rounded="rounded"
        :shaped="shaped"
        :show-size="showSize"
        :single-line="singleLine"
        :small-chips="smallChips"
        :solo="solo"
        :solo-inverted="soloInverted"
        :success="success"
        :success-messages="successMessages"
        :suffix="suffix"
        :truncate-length="truncateLength"
        :accept="accept"
        :fileType="fileType"
        v-model="newFile"
        @change="$_passTheBase64"
        v-bind="$attrs"
        v-on="listeners"
        :rules="normalRules"
        :validate-on-blur="validateOnBlur"
    >
        <template v-slot:selection="{ text }">
            <v-chip small label color="primary">
                {{ text }}
            </v-chip>
        </template>
    </v-file-input>
</template>
