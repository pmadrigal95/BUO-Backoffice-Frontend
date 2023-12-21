<script>
/**
 * Descripción: Pantalla Pruebas
 *
 * @displayName HeaderAssessmentView
 */

import { mapGetters } from 'vuex';

import baseSecurityHelper from '@/helpers/baseSecurityHelper';

const BaseTemplateListView = () =>
    import(
        '@/views/assessment/components/review/shared/template/BaseTemplateListView'
    );

export default {
    name: 'HeaderAssessmentView',

    props: {
        entity: {
            type: Object,
            requiered: true,
        },
    },

    components: { BaseTemplateListView },

    computed: {
        ...mapGetters('theme', ['app']),

        write() {
            const result = baseSecurityHelper.$_ReadPermission(
                'AssessmentViewComponent',
                baseSecurityHelper.$_write
            );
            return result;
        },
    },

    methods: {
        $_fnEdit() {
            this.entity.step.assessmentStep = 1;
        },
    },
};
</script>

<template>
    <v-slide-x-transition appear>
        <v-card flat class="pa-6">
            <v-row class="pb-5">
                <v-col cols="12" md="8" class="d-flex align-self-end">
                    <section
                        class="BUO-Heading-Small"
                        :class="[
                            app ? 'blueProgress600--text' : 'blue900--text',
                        ]"
                    >
                        Assessment Template
                    </section>
                </v-col>
                <v-col cols="12" md="4" class="d-flex justify-end" v-if="write">
                    <v-btn
                        @click="$_fnEdit"
                        icon
                        :color="app ? 'clouds' : 'black'"
                    >
                        <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                </v-col>
            </v-row>
            <BaseTemplateListView :list="entity.template" />
        </v-card>
    </v-slide-x-transition>
</template>
