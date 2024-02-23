<script>
/**
 * Descripción: Pantalla Sandbox 2
 *
 * @displayName Sandbox2ViewComponent
 *
 */
const MoreInsightsCardViewComponent = () =>
    import(
        '@/views/sandbox/joselyn/components/cards/home/MoreInsightsCardViewComponent'
    );

const MoreInsightsGrowthCardViewComponent = () =>
    import(
        '@/views/sandbox/joselyn/components/cards/growth/MoreInsightsCardViewComponent'
    );

const AIDrivenInsightsCardViewComponent = () =>
    import(
        '@/views/sandbox/joselyn/components/cards/home/AIDrivenInsightsCardViewComponent'
    );

export default {
    name: 'Sandbox2ViewComponent',

    components: {
        MoreInsightsCardViewComponent,
        AIDrivenInsightsCardViewComponent,
        MoreInsightsGrowthCardViewComponent
    },

    methods: {
        test() {
            alert('hola');
        },
    },
};
</script>

<template>
    <v-row>
        <v-col cols="12">
            <AIDrivenInsightsCardViewComponent />
        </v-col>
        <v-col cols="12">
            <MoreInsightsCardViewComponent />
        </v-col>
        <v-col cols="12">
            <MoreInsightsGrowthCardViewComponent />
        </v-col>
    </v-row>
</template>

<style scoped>
.w-50 {
    width: 50%;
}
</style>
