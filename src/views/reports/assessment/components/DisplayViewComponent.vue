<script>
/**
 * Descripción: Pantalla Display
 *
 * @displayName DisplayViewComponent
 *
 */

const FilterViewComponent = () =>
    import('@/views/reports/assessment/components/FilterViewComponent');

const ReportViewComponent = () =>
    import('@/views/reports/assessment/components/ReportViewComponent');

export default {
    name: 'DisplayViewComponent',

    props: {
        entity: {
            type: Object,
            requiered: true,
        },
    },

    components: {
        FilterViewComponent,
        ReportViewComponent,
    },
};
</script>

<template>
    <v-window v-model="entity.step" touchless>
        <v-window-item :value="0">
            <FilterViewComponent :entity="entity" />
        </v-window-item>

        <v-window-item :value="1">
            <ReportViewComponent :entity="entity" />
        </v-window-item>
    </v-window>
</template>
