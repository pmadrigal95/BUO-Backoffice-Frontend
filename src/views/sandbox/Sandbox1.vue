<script>
/**
 * Descripción: Pantalla  Sandbox 1
 *
 */

const BaseBasicCardViewComponent = () =>
    import(
        '@/views/dashboard/components/shared/card/BaseBasicCardViewComponent'
    );

export default {
    name: 'sandbox',

    components: {
        BaseBasicCardViewComponent,
    },
};
</script>

<template>
    <BaseBasicCardViewComponent title="Vacantes abiertas">
        <section slot="top-actions">
            <v-btn
                v-if="!isOnlyChart"
                icon
                :color="app ? 'clouds' : 'black'"
                @click="showContent = !showContent"
            >
                <v-icon>{{
                    `mdi-${
                        showContent ? 'information' : 'information-off-outline'
                    }`
                }}</v-icon>
            </v-btn>
        </section>
        <section slot="card-text">
            <v-row>
                <v-col cols="12" :md="md" align-self="center">
                    <BaseCustomBubbleChartImpl
                        :chartData="chartConfig"
                        positionLegend="right"
                        :dark="app"
                        :showLegend="showLegend && !$vuetify.breakpoint.mobile"
                    />
                </v-col>
                <v-col
                    cols="12"
                    :md="contentColumns"
                    align-self="center"
                    v-if="showContent"
                >
                    <slot name="content"></slot>
                </v-col>
            </v-row>
        </section>
    </BaseBasicCardViewComponent>
</template>
