<script>
/**
 * Descripción: Pantalla Filtro User Assessments
 *
 * @displayName AssessmentViewComponent
 *
 */

import { mapGetters } from 'vuex';

const BaseCardViewComponent = () =>
    import('@/components/core/cards/BaseCardViewComponent');

const ScaleHelperViewComponent = () =>
    import('@/views/b2b/filter/common/display/ScaleHelperViewComponent');

const DisplayViewComponent = () =>
    import('@/views/reports/assessment/components/DisplayViewComponent');

export default {
    name: 'AssessmentViewComponent',

    components: {
        BaseCardViewComponent,
        DisplayViewComponent,
        ScaleHelperViewComponent,
    },

    data() {
        return {
            entity: this.$_Object(),
        };
    },

    computed: {
        ...mapGetters('authentication', ['user', 'buoId']),

        ...mapGetters('theme', ['app']),
    },

    methods: {
        /**
         * Entity Object
         */
        $_Object() {
            return {};
        },
    },
};
</script>

<template>
    <BaseCardViewComponent
        title="Supervisa con precisión, lidera con éxito"
        subtitle="Tu centro de control de assessments para un equipo de alto rendimiento."
    >
        <div slot="card-text">
            <span>Filtros Avanzados</span>

            <v-card flat class="rounded-t-xl">
                <v-card-text>
                    <v-row justify="end" class="pa-3">
                        <span>Aca va el boton</span>
                    </v-row>
                    <ScaleHelperViewComponent />
                    <section class="pt-3">
                        <DisplayViewComponent :entity="entity" />
                    </section>
                </v-card-text>
            </v-card>
        </div>
    </BaseCardViewComponent>
</template>
