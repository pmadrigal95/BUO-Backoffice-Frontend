<script>
/**
 * Descripción: calendario reutilizable
 *
 * @displayName BaseDatePicker
 */

/**
 * Libreria para trabajar fechas date-fns
 */
import { format, parse } from 'date-fns';

import baseLocalHelper from '@/helpers/baseLocalHelper';

/**
 * Configuraciones por Defecto
 */
const DEFAULT_DATE = '';

/**
 * Inicializador del timer
 */
const DEFAULT_TIME = baseLocalHelper.$_startTime;

/**
 * Formato de Fecha
 */
const DEFAULT_DATE_FORMAT = baseLocalHelper.$_DateFormat;

/**
 * Formato de Hora
 */
const DEFAULT_TIME_FORMAT = baseLocalHelper.$_TimeFormat;

/**
 * tamaño del componente
 */
const DEFAULT_DIALOG_WIDTH = 340;

export default {
    name: 'BaseDatePicker',

    /**
     * Comunicación de Componentes
     */
    model: {
        prop: 'datetime',
        event: 'input',
    },

    /**
     * Props
     */
    props: {
        /**
         * v-model
         */
        datetime: {
            type: [Date, String],
            default: null,
        },

        /**
         * control disable
         */
        disabled: {
            type: Boolean,
        },

        /**
         * Animación de Cargar
         */
        loading: {
            type: Boolean,
        },

        /**
         * Label
         */
        label: {
            type: String,
            default: '',
        },

        /**
         * Tamaño del componente
         */
        dialogWidth: {
            type: Number,
            default: DEFAULT_DIALOG_WIDTH,
        },

        /**
         * Formato de Fecha
         */
        dateFormat: {
            type: String,
            default: DEFAULT_DATE_FORMAT,
        },

        /**
         * Formato de Hora
         */
        timeFormat: {
            type: String,
            default: 'HH:mm',
        },

        /**
         * Label para limpiar componente
         */
        clearText: {
            type: String,
            default: undefined,
        },

        /**
         * Label para seleccionar
         */
        okText: {
            type: String,
            default: undefined,
        },

        /**
         * Propiedades del v-text-field
         */
        textFieldProps: {
            type: Object,
        },

        /**
         * Propiedades del v-Date-Picker
         */
        datePickerProps: {
            type: Object,
        },

        /**
         * Propiedades del v-Time-Picker
         */
        timePickerProps: {
            type: Object,
        },

        /**
         * Propiedades dense del text-field
         */
        dense: {
            default: false,
        },

        /**
         * Tipo de Componente
         * @Type => date, time, datetime
         */
        type: {
            type: String,
            required: true,
        },

        /**
         * Como validar el input
         * ['text'] ['email'] [ @validacionPersonalizada ]
         */
        validate: {
            type: Array,
            required: false,
        },
    },

    data() {
        return {
            display: false,
            activeTab: 0,
            date: DEFAULT_DATE,
            time: DEFAULT_TIME,
            datePicker: null,
            timePicker: null,
            normalRules: [],
        };
    },

    computed: {
        dateTimeFormat() {
            if (this.type === 'date') {
                return this.dateFormat;
            } else if (this.type === 'time') {
                return this.timeFormat;
            } else {
                return this.dateFormat + ' ' + this.timeFormat;
            }
        },
        defaultDateTimeFormat() {
            if (this.type === 'date') {
                return DEFAULT_DATE_FORMAT;
            } else if (this.type === 'time') {
                return DEFAULT_TIME_FORMAT;
            } else {
                return DEFAULT_DATE_FORMAT + ' ' + DEFAULT_TIME_FORMAT;
            }
        },
        formattedDatetime() {
            return this.selectedDatetime
                ? format(this.selectedDatetime, this.dateTimeFormat)
                : '';
        },
        selectedDatetime() {
            let datetimeString;
            if (this.type === 'time') {
                datetimeString = this.time;
                if (this.time.length === 5) {
                    datetimeString += ':00';
                }
                return parse(
                    datetimeString,
                    this.defaultDateTimeFormat,
                    new Date()
                );
            } else {
                if (this.date && this.time) {
                    if (this.type === 'date') {
                        datetimeString = this.date;
                    } else {
                        datetimeString = this.date + ' ' + this.time;
                        if (this.time.length === 5) {
                            datetimeString += ':00';
                        }
                    }
                    return parse(
                        datetimeString,
                        this.defaultDateTimeFormat,
                        new Date()
                    );
                } else {
                    return null;
                }
            }
        },

        dateSelected() {
            return !this.date;
        },
    },

    watch: {
        datetime: function (val) {
            this.init();
            if (val === null || val === undefined || val === '') {
                this.clearHandler();
            }
        },
    },

    created() {
        if (this.type === 'date') {
            (this.datePicker = true), (this.timePicker = false);
        } else if (this.type === 'time') {
            (this.datePicker = false), (this.timePicker = true);
            this.activeTab = 1;
        } else {
            (this.datePicker = true), (this.timePicker = true);
        }

        /**
         * Validaciones
         */
        if (this.validate != undefined) {
            switch (this.validate[0]) {
                case 'text':
                    this.normalRules = [
                        (v) =>
                            !!v ||
                            baseLocalHelper.$_MsgFieldRequired(
                                this.label != undefined ? this.label : ''
                            ),
                    ];
                    break;
                default:
                    this.normalRules = this.validar;
            }
        }
    },

    mounted() {
        this.init();
    },

    methods: {
        init() {
            if (!this.datetime) {
                return;
            }
            let initDateTime;
            if (this.datetime instanceof Date) {
                initDateTime = this.datetime;
            } else if (
                typeof this.datetime === 'string' ||
                this.datetime instanceof String
            ) {
                // see https://stackoverflow.com/a/9436948
                initDateTime = parse(
                    this.datetime,
                    this.dateTimeFormat,
                    new Date()
                );
            }
            this.date = format(initDateTime, DEFAULT_DATE_FORMAT);
            this.time = format(initDateTime, DEFAULT_TIME_FORMAT);
        },
        okHandler() {
            this.resetPicker();
            this.$emit('input', this.formattedDatetime);
        },
        clearHandler() {
            this.resetPicker();
            this.date = DEFAULT_DATE;
            this.time = DEFAULT_TIME;
            this.$emit('input', null);
        },
        resetPicker() {
            this.display = false;

            this.type === 'time' ? (this.activeTab = 1) : (this.activeTab = 0);

            if (this.$refs.timer) {
                this.$refs.timer.selectingHour = true;
            }
        },
        showTimePicker() {
            if (this.type === 'date') {
                this.activeTab = 0;
            } else {
                this.activeTab = 1;
            }
        },
    },
};
</script>

<template>
    <v-dialog
        v-model="display"
        :width="dialogWidth"
        persistent
        class="rounded-lg"
    >
        <template v-slot:activator="{ on }">
            <v-text-field
                :dense="dense"
                v-bind="textFieldProps"
                :disabled="disabled"
                :loading="loading"
                :label="label"
                :value="formattedDatetime"
                v-on="on"
                readonly
                :rules="normalRules"
                outlined
            >
                <template v-slot:progress>
                    <slot name="progress">
                        <v-progress-linear
                            color="primary"
                            indeterminate
                            absolute
                            height="2"
                        ></v-progress-linear>
                    </slot>
                </template>
            </v-text-field>
        </template>

        <v-card>
            <v-card-text class="px-0 py-0">
                <v-tabs fixed-tabs v-model="activeTab">
                    <v-tab key="calendar" v-if="this.datePicker">
                        <slot name="dateIcon">
                            <v-icon left>mdi-calendar</v-icon>
                        </slot>
                    </v-tab>
                    <v-tab
                        key="timer"
                        :disabled="dateSelected"
                        v-if="this.timePicker"
                    >
                        <slot name="timeIcon">
                            <v-icon left>mdi-clock-time-four-outline</v-icon>
                        </slot>
                    </v-tab>
                    <v-tab-item key="calendar">
                        <v-date-picker
                            v-model="date"
                            v-bind="datePickerProps"
                            @input="showTimePicker"
                            full-width
                            color="primary"
                        ></v-date-picker>
                    </v-tab-item>
                    <v-tab-item key="timer">
                        <v-time-picker
                            ref="timer"
                            class="v-time-picker-custom"
                            v-model="time"
                            v-bind="timePickerProps"
                            full-width
                        ></v-time-picker>
                    </v-tab-item>
                </v-tabs>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <slot name="actions" :parent="this">
                    <v-btn
                        class="ma-2 no-uppercase rounded-lg"
                        color="grey lighten-1"
                        text
                        @click.native="clearHandler"
                        >{{ clearText ? clearText : 'Cancelar' }}</v-btn
                    >
                    <v-btn
                        class="ma-2 no-uppercase rounded-lg"
                        color="primary"
                        text
                        @click="okHandler"
                        >{{ okText ? okText : 'Seleccionar' }}</v-btn
                    >
                </slot>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
