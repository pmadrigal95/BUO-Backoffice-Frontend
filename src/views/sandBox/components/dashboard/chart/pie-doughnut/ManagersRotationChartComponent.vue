<script>
/**
 * Descripción: Pantalla  ManagersRotationChartComponent
 *
 * @displayName ManagersRotationChartComponent
 *
 */

import { mapGetters } from 'vuex';

const BaseCardViewComponent = () =>
    import(
        '@/views/sandBox/components/dashboard/shared/card/BaseCardViewComponent'
    );

export default {
    name: 'ManagersRotationChartComponent',

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
    <BaseCardViewComponent title="Managers y su porcentaje de rotación">
        <div slot="card-text">
            <p>Hola</p>
        </div>
    </BaseCardViewComponent>
</template>
