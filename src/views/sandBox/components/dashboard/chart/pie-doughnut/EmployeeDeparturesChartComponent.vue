<script>
/**
 * Descripción: Pantalla  EmployeeDeparturesChartComponent
 *
 * @displayName EmployeeDeparturesChartComponent
 *
 */

import { mapGetters } from 'vuex';

const BaseCardViewComponent = () =>
    import(
        '@/views/sandBox/components/dashboard/shared/card/BaseCardViewComponent'
    );

export default {
    name: 'EmployeeDeparturesChartComponent',

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
    <BaseCardViewComponent title="% y número de salidas de colaboradores">
        <div slot="card-text">
            <p>Hola</p>
        </div>
    </BaseCardViewComponent>
</template>
