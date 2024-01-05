<script>
/**
 * Descripción: Pantalla  ExitInterviewsChartComponent
 *
 * @displayName ExitInterviewsChartComponent
 *
 */

import { mapGetters } from 'vuex';

const BaseCardViewComponent = () =>
    import(
        '@/views/sandBox/components/dashboard/shared/card/BaseCardViewComponent'
    );

export default {
    name: 'ExitInterviewsChartComponent',

    components: {
        BaseCardViewComponent,
    },

    computed: {
        ...mapGetters('theme', ['app']),

        fake() {
            return [];
        },
    },
};
</script>

<template>
    <BaseCardViewComponent title="Entrevistas de salida">
        <div slot="card-text">
            <p>Hola</p>
        </div>
    </BaseCardViewComponent>
</template>
