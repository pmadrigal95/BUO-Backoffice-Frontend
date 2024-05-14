<script>
/**
 * Descripción: Pantalla  GridContainerViewComponent
 *
 * @displayName GridContainerViewComponent
 *
 */

import { mapGetters } from 'vuex';

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
    },

    components: { FilterViewComponent },

    data() {
        return {
            tab: null,
        };
    },

    computed: {
        ...mapGetters('theme', ['app']),
    },
};
</script>

<template>
    <section>
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
                <FilterViewComponent :vacancyId="vacancyId" />
            </v-tab-item>

            <v-tab-item>
                <span>2</span>
            </v-tab-item>

            <v-tab-item>
                <span>3</span>
            </v-tab-item>
        </v-tabs-items>
    </section>
</template>
