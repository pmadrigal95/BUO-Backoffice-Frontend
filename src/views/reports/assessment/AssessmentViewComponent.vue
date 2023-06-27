<script>
/**
 * Descripción: Pantalla Assessments
 *
 * @displayName AssessmentViewComponent
 *
 */

import { mapGetters } from 'vuex';

const BaseCardViewComponent = () =>
    import('@/components/core/cards/BaseCardViewComponent');

export default {
    name: 'AssessmentViewComponent',

    components: {
        BaseCardViewComponent,
    },

    data() {
        return {
            tracked: {
                '2023-06-15': [10],
                '2023-06-14': [10],
                '2023-06-16': [10],
                '2023-06-12': [10],
                '2023-06-19': [5],
                '2023-06-20': [50],
                '2023-06-21': [23],
                '2023-06-22': [90],
                '2023-06-23': [32],
            },
            focus: '',
        };
    },

    computed: {
        ...mapGetters('theme', ['app']),
    },

    mounted() {
        this.$refs.calendar?.checkChange();
    },

    methods: {
        viewDay({ date, future }) {
            this.focus = date;
            this.type = 'day';
            alert(date);
            console.log({ date, future });
        },
        getEventColor(event) {
            return event.color;
        },
        setToday() {
            this.focus = '';
        },
        prev() {
            this.$refs.calendar.prev();
        },
        next() {
            this.$refs.calendar.next();
        },
        updateRange({ start, end }) {
            console.log({ start, end });
        },
    },
};
</script>

<template>
    <BaseCardViewComponent title="Assessments">
        <div slot="body">
            <v-card flat class="rounded-t-xl">
                <v-card-text>
                    <v-row class="fill-height">
                        <v-col>
                            <v-sheet height="64">
                                <v-toolbar flat>
                                    <v-btn
                                        outlined
                                        class="mr-4"
                                        color="grey darken-2"
                                        @click="setToday"
                                    >
                                        Hoy
                                    </v-btn>
                                    <v-btn
                                        fab
                                        text
                                        small
                                        color="grey darken-2"
                                        @click="prev"
                                    >
                                        <v-icon small>
                                            mdi-chevron-left
                                        </v-icon>
                                    </v-btn>
                                    <v-btn
                                        fab
                                        text
                                        small
                                        color="grey darken-2"
                                        @click="next"
                                    >
                                        <v-icon small>
                                            mdi-chevron-right
                                        </v-icon>
                                    </v-btn>
                                    <v-toolbar-title v-if="$refs.calendar">
                                        {{ $refs.calendar.title }}
                                    </v-toolbar-title>
                                </v-toolbar>
                            </v-sheet>
                            <v-sheet height="480">
                                <v-calendar
                                    ref="calendar"
                                    v-model="focus"
                                    color="primary"
                                    @click:day="viewDay"
                                    @click:date="viewDay"
                                    @change="updateRange"
                                >
                                    <!-- <template v-slot:day-label="{ date }">
                                        <v-layout
                                            justify-center
                                            align-content-center
                                        >
                                            <template v-if="tracked[date]">
                                                <span>{{ date }} 🔥</span>
                                            </template>
                                            <template v-else>
                                                <span>{{ date }}</span>
                                            </template>
                                        </v-layout>
                                    </template> -->

                                    <template v-slot:day="{ past, date }">
                                        <v-layout
                                            justify-center
                                            align-content-center
                                        >
                                            <template
                                                v-if="past && tracked[date]"
                                            >
                                                <span>🔥</span>
                                            </template>
                                        </v-layout>
                                    </template></v-calendar
                                >
                            </v-sheet>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </div>
    </BaseCardViewComponent>
</template>
