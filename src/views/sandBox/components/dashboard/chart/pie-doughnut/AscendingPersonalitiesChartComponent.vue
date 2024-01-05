<script>
/**
 * Descripción: Pantalla  AscendingPersonalitiesChartComponent
 *
 * @displayName AscendingPersonalitiesChartComponent
 *
 */

import { mapGetters } from 'vuex';

import baseDataVisualizationColorsHelper from '@/views/demographics/pda/components/shared/baseDataVisualizationColorsHelper';

const BasePieChartImpl = () =>
    import('@/components/backoffice/chart/BasePieChartImpl');

const BaseCardViewComponent = () =>
    import(
        '@/views/sandBox/components/dashboard/shared/card/BaseCardViewComponent'
    );

export default {
    name: 'AscendingPersonalitiesChartComponent',

    components: {
        BasePieChartImpl,
        BaseCardViewComponent,
    },

    computed: {
        ...mapGetters('theme', ['app']),

        fake() {
            return {
                labels: [
                    'Amigable',
                    'Cautivadora',
                    'Audaz',
                    'Tenaz',
                    'Detallista',
                    'Intuitiva',
                    'Proactiva',
                    'Dinámica',
                ],
                data: [4, 1, 1, 1, 2, 1, 2, 1],
                colors: [
                    'Amigable',
                    'Cautivadora',
                    'Audaz',
                    'Tenaz',
                    'Detallista',
                    'Intuitiva',
                    'Proactiva',
                    'Dinamica',
                ],
            };
        },

        chartData() {
            return {
                labels: this.fake.labels,
                datasets: [
                    {
                        backgroundColor: this.fake.colors.map((profile) =>
                            baseDataVisualizationColorsHelper.$_getColor({
                                profile: profile.toLowerCase(),
                                type: 'backgroundColor',
                            })
                        ),
                        hoverBackgroundColor: this.fake.colors.map((profile) =>
                            baseDataVisualizationColorsHelper.$_getColor({
                                profile: profile.toLowerCase(),
                                type: 'hoverBackgroundColor',
                            })
                        ),
                        hoverBorderColor: this.fake.colors.map((profile) =>
                            baseDataVisualizationColorsHelper.$_getColor({
                                profile: profile.toLowerCase(),
                                type: 'hoverBorderColor',
                            })
                        ),
                        borderColor: this.fake.colors.map((profile) =>
                            baseDataVisualizationColorsHelper.$_getColor({
                                profile: profile.toLowerCase(),
                                type: 'borderColor',
                            })
                        ),
                        data: this.fake.data,
                    },
                ],
            };
        },
    },
};
</script>

<template>
    <BaseCardViewComponent title="Personalidades con más ascensos">
        <div slot="card-text">
            <BasePieChartImpl
                :chartData="chartData"
                positionLegend="right"
                :dark="app"
                :showLegend="!$vuetify.breakpoint.mobile"
            />
        </div>
    </BaseCardViewComponent>
</template>
