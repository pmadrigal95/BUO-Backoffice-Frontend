<script>
/**
 * Descripción: Date Picker reutilizable
 *
 * @displayName BaseDatePicker
 *
 * @ https://vuetifyjs.com/en/api/v-date-picker/
 */

import baseSharedFnHelper from '@/helpers/baseSharedFnHelper';

export default {
    name: 'BaseDatePicker',

    inheritAttrs: false,

    props: {
        /**
         * active-picker
         * Determines which picker in the date or month picker is being displayed.
         * Allowed values: 'DATE', 'MONTH', 'YEAR'
         */
        activePicker: {
            type: String,
            default: undefined,
        },

        /**
         * allowed-dates
         * Restricts which dates can be selected
         */
        allowedDates: {
            type: Function,
            default: null,
        },

        /**
         * color
         * Applies specified color to the control - it can be the name of material color
         * css color (#033 or rgba(255, 0, 0, 0.5)).
         */
        color: {
            type: String,
            default: 'blue900',
        },

        /**
         * Applies the dark theme variant to the component.
         */
        dark: {
            type: Boolean,
            default: false,
        },

        /**
         * day-format
         * Allows you to customize the format of the day string that appears in the date table. Called with date (ISO 8601 date string) arguments.
         */
        dayFormat: {
            type: Function,
            default: null,
        },

        /**
         * Disables interaction with the picker
         */
        disabled: {
            type: Boolean,
            default: false,
        },

        /**
         * Designates an elevation applied to the component between 0 and 24.
         */
        elevation: {
            type: [Number, String],
            default: undefined,
        },

        /**
         * event-color
         * Sets the color for event dot. It can be string (all events will have the same color)
         *  or object where attribute is the event date and value is boolean/color/array of colors for specified date
         *  or function taking date as a parameter and returning boolean/color/array of colors for that date
         */
        eventColor: {
            type: [Array, Function, Object, String],
            default: undefined,
        },

        /**
         * Array of dates or object defining events or colors or function returning boolean/color/array of colors
         */
        events: {
            type: [Array, Function, Object],
            default: null,
        },

        /**
         * first-day-of-week
         * Sets the first day of the week, starting with 0 for Sunday.
         */
        firstDayOfWeek: {
            type: [String, Number],
            default: 0,
        },

        /**
         * Removes elevation
         */
        flat: {
            type: Boolean,
            default: false,
        },

        /**
         * full-width
         * Forces 100% width
         */
        fullWidth: {
            type: Boolean,
            default: false,
        },

        /**
         * header-color
         * not specified it will use the color defined by color prop or the default picker color
         */
        headerColor: {
            type: String,
            default: undefined,
        },

        /**
         * header-date-format
         * Allows you to customize the format of the month string that appears in the header of the calendar.
         * Called with date (ISO 8601 date string) arguments.
         */
        headerDateFormat: {
            type: Function,
            default: null,
        },

        /**
         * landscape
         * Orients picker horizontal
         */
        landscape: {
            type: Boolean,
            default: false,
        },

        /**
         * light
         * Applies the light theme variant to the component.
         */
        light: {
            type: Boolean,
            default: false,
        },

        /**
         * locale
         * Sets the locale. Accepts a string with a BCP 47 language tag.
         */
        locale: {
            type: String,
            default: undefined,
        },

        /**
         * locale-first-day-of-year
         * Sets the day that determines the first week of the year, starting with 0 for Sunday. For ISO 8601 this should be 4.
         */
        localeFirstDayOfYear: {
            type: [String, Number],
            default: 0,
        },

        /**
         * max
         * Maximum allowed date/month (ISO 8601 format)
         */
        max: {
            type: String,
            default: undefined,
        },

        /**
         * min
         * Minimum allowed date/month (ISO 8601 format)
         */
        min: {
            type: String,
            default: undefined,
        },

        /**
         * month-format
         * 	Formatting function used for displaying months in the months table. Called with date (ISO 8601 date string) arguments.
         */
        monthFormat: {
            type: Function,
            default: null,
        },

        /**
         * Allow the selection of multiple dates
         */
        multiple: {
            type: Boolean,
            default: false,
        },

        /**
         * no-title
         * Hide the picker title
         */
        noTitle: {
            type: Boolean,
            default: true,
        },

        /**
         * picker-date
         * Displayed year/month
         */
        pickerDate: {
            type: String,
            default: undefined,
        },

        /**
         * range
         * Allow the selection of date range
         */
        range: {
            type: Boolean,
            default: false,
        },

        /**
         * Updates the picker model when changing months/years automatically
         */
        reactive: {
            type: Boolean,
            default: false,
        },

        /**
         * Makes the picker readonly (doesn’t allow to select new date)
         */
        readonly: {
            type: Boolean,
            default: false,
        },

        /**
         * Allows changing displayed month with mouse scroll
         */
        scrollable: {
            type: Boolean,
            default: true,
        },

        /**
         * show-adjacent-months
         * Toggles visibility of days from previous and next months
         */
        showAdjacentMonths: {
            type: Boolean,
            default: false,
        },

        /**
         * show-current
         * Toggles visibility of the current date/month outline or shows the provided date/month as a current
         */
        showCurrent: {
            type: Boolean,
            default: true,
        },

        /**
         * show-week
         * Toggles visibility of the week numbers in the body of the calendar
         */
        showWeek: {
            type: Boolean,
            default: false,
        },

        /**
         * title-date-format
         * 	Allows you to customize the format of the date string that appears in the title of the date picker.
         * Called with date (ISO 8601 date string) arguments.
         */
        titleDateFormat: {
            type: Function,
            default: null,
        },

        /**
         * type
         * Determines the type of the picker - date for date picker, month for month picker
         */
        type: {
            type: String,
            default: 'date',
        },

        /**
         * value
         * Date picker model (ISO 8601 format, YYYY-mm-dd or YYYY-mm)
         */
        value: {
            type: [Array, String],
            default: undefined,
        },

        /**
         * weekday-format
         * Date picker model (ISO 8601 format, YYYY-mm-dd or YYYY-mm)
         */
        weekdayFormat: {
            type: Function,
            default: null,
        },

        /**
         * width
         * Width of the picker
         */
        width: {
            type: [Number, String],
            default: 290,
        },

        /**
         * year-format
         * Allows you to customize the format of the year string that appears in the header of the calendar.
         * Called with date (ISO 8601 date string) arguments.
         */
        yearFormat: {
            type: Function,
            default: null,
        },

        /**
         * year-icon
         * Sets the icon in the year selection button
         */
        yearIcon: {
            type: Function,
            default: null,
        },

        /**
         * label
         * BaseInput's Label
         */
        label: {
            type: String,
            default: undefined,
        },

        /**
         * append-icon
         * BaseInput's Label
         */
        appendIcon: {
            type: String,
            default: undefined,
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
         * reqCurrentMaxDate
         */
        reqCurrentMaxDate: {
            type: Boolean,
            default: false,
        },

        /**
         * reqCurrentMaxDate
         */
        reqCurrentMinDate: {
            type: Boolean,
            default: false,
        },
    },

    data() {
        return {
            menu: false,
        };
    },

    computed: {
        listeners() {
            return {
                ...this.$listeners,
                input: this.$_updateValue,
            };
        },

        $_reqCurrentMaxDate() {
            return this.reqCurrentMaxDate
                ? baseSharedFnHelper.$_getCurrentDateISOString()
                : this.max;
        },

        $_reqCurrentMinDate() {
            return this.reqCurrentMinDate
                ? baseSharedFnHelper.$_getCurrentDateISOString()
                : this.min;
        },
    },

    methods: {
        $_updateValue(event) {
            this.$emit('input', event);
            this.menu = this.menu ? false : this.menu;
        },
    },
};
</script>

<template>
    <v-menu
        v-model="menu"
        :close-on-content-click="false"
        transition="scale-transition"
        offset-y
        min-width="auto"
    >
        <template v-slot:activator="{ on, attrs }">
            <BaseInput
                @input="$_updateValue"
                :value="value"
                :label="label"
                :append-icon="appendIcon"
                :validate="validate"
                readonly
                :validateOnBlur="false"
                v-bind="attrs"
                v-on="on"
            ></BaseInput>
        </template>
        <v-date-picker
            :active-picker="activePicker"
            :allowed-dates="allowedDates"
            :color="color"
            :dark="dark"
            :day-format="dayFormat"
            :disabled="disabled"
            :elevation="elevation"
            :event-color="eventColor"
            :events="events"
            :first-day-of-week="firstDayOfWeek"
            :flat="flat"
            :full-width="fullWidth"
            :header-color="headerColor"
            :header-date-format="headerDateFormat"
            :landscape="landscape"
            :light="light"
            :locale="locale"
            :locale-first-day-of-year="localeFirstDayOfYear"
            :max="$_reqCurrentMaxDate"
            :min="$_reqCurrentMinDate"
            :month-format="monthFormat"
            :multiple="multiple"
            :no-title="noTitle"
            :picker-date="pickerDate"
            :range="range"
            :reactive="reactive"
            :readonly="readonly"
            :scrollable="scrollable"
            :show-adjacent-months="showAdjacentMonths"
            :show-current="showCurrent"
            :show-week="showWeek"
            :title-date-format="titleDateFormat"
            :type="type"
            :value="value"
            :weekday-format="weekdayFormat"
            :width="width"
            :year-format="yearFormat"
            :year-icon="yearIcon"
            @input="$_updateValue"
        ></v-date-picker>
    </v-menu>
</template>
