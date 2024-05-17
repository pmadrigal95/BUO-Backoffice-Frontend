<script>
/**
 * Descripción: Pantalla  GridContainerViewComponent
 *
 * @displayName GridContainerViewComponent
 *
 */

import { mapGetters } from 'vuex';

import baseConfigHelper from '@/helpers/baseConfigHelper';

const FilterViewComponent = () =>
    import(
        '@/views/dashboard/recruitmentDashboard/components/grid/FilterViewComponent'
    );

export default {
    name: 'GridContainerViewComponent',

    props: {
        vacancyId: {
            type: [Number, String],
            requiered: true,
        },

        callback: {
            type: Function,
            required: true,
        },
    },

    components: { FilterViewComponent },

    data() {
        return {
            tab: null,
        };
    },

    computed: {
        ...mapGetters('theme', ['app']),

        candidates() {
            return baseConfigHelper.$_statusCode.active;
        },

        selectedCandidates() {
            return baseConfigHelper.$_statusCode.selectedCandidates;
        },

        rejectedCandidates() {
            return baseConfigHelper.$_statusCode.rejectedCandidates;
        },
    },
};
</script>

<template>
    <v-card flat class="rounded-lg">
        <v-card-text>
            <v-tabs
                v-model="tab"
                right
                show-arrows
                height="34"
                class="pa-3"
                :color="app ? 'blueProgress600' : 'blue800'"
            >
                <v-tabs-slider color="transparent"></v-tabs-slider>
                <v-tab
                    class="rounded-pill no-uppercase mr-3"
                    active-class="tab-active-white"
                    ><p class="BUO-Label-Small pt-4">Candidatos</p>
                </v-tab>

                <v-tab
                    class="rounded-pill no-uppercase mr-3"
                    active-class="tab-active-white"
                    ><p class="BUO-Label-Small pt-4">Seleccionados</p>
                </v-tab>

                <v-tab
                    class="rounded-pill no-uppercase mr-3"
                    active-class="tab-active-white"
                    ><p class="BUO-Label-Small pt-4">Rechazados</p>
                </v-tab>
            </v-tabs>

            <v-tabs-items v-model="tab" class="pa-5">
                <v-tab-item>
                    <FilterViewComponent
                        :vacancyId="vacancyId"
                        :statusCode="candidates"
                        :callback="callback"
                        v-if="tab == 0"
                    />
                </v-tab-item>

                <v-tab-item>
                    <FilterViewComponent
                        :vacancyId="vacancyId"
                        :statusCode="selectedCandidates"
                        :callback="callback"
                        v-if="tab == 1"
                    />
                </v-tab-item>

                <v-tab-item>
                    <FilterViewComponent
                        :vacancyId="vacancyId"
                        :statusCode="rejectedCandidates"
                        :callback="callback"
                        v-if="tab == 2"
                    />
                </v-tab-item>
            </v-tabs-items>
        </v-card-text>
    </v-card>
</template>
