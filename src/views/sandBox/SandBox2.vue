<script>
/**
 * Descripción: Pantalla  SandBox1
 *
 * @displayName SandBox2
 *
 */
import { mapGetters } from 'vuex';

import baseArrayHelper from '@/helpers/baseArrayHelper.js';

import baseDataVisualizationColorsHelper from '@/helpers/baseDataVisualizationColorsHelper';

import baseDataVisualizationColorsHelperPDA from '@/views/demographics/pda/components/shared/baseDataVisualizationColorsHelper';

const BaseNotFoundContent = () =>
    import('@/components/core/cards/BaseNotFoundContent');

const StadisticCardViewComponent = () =>
    import('@/views/sandBox/components/joselyn/StadisticCardViewComponent');

const BaseBubblesChartViewComponent = () =>
    import('@/views/sandBox/components/joselyn/BaseBubblesChartViewComponent');

export default {
    name: 'SandBox2',

    components: {
        BaseNotFoundContent,
        StadisticCardViewComponent,
        BaseBubblesChartViewComponent,
    },

    data() {
        return {
            tab: null,
            entity: {},
        };
    },

    computed: {
        ...mapGetters('theme', ['app']),

        chartData() {
            return {
                labels: [
                    'Tenaz',
                    'Detallista',
                    'Audaz',
                    'Cautivadora',
                    'Proactiva',
                ],
                data: [456, 50, 5, 345, 10],
            };
        },

        sortChartData() {
            return baseArrayHelper.SortArray(this.chartData.data, 'desc');
        },
    },

    created() {
        this.$_setEntity();
    },

    methods: {
        $_fnTest() {
            alert('hola');
        },

        $_setEntity() {
            this.entity = this.$_mapperEntity();
        },

        $_setColor(isPDA, profile) {
            if (isPDA) {
                return baseDataVisualizationColorsHelperPDA.$_getColor({
                    profile: profile.toLowerCase(),
                    type: 'backgroundColor',
                });
            } else {
                return baseDataVisualizationColorsHelper.$_randomColor().main;
            }
        },

        $_mapperEntity() {
            const isPDA = true;
            return this.sortChartData.map((element, index) => ({
                name: this.chartData.labels[index],
                value: element,
                iconLegend: 'mdi-circle-medium',
                color: this.$_setColor(isPDA, this.chartData.labels[index]),
                style: `size-${index}`,
                show: true,
            }));
        },
    },
};
</script>

<template>
    <div>
        <v-tabs
            v-model="tab"
            left
            show-arrows
            height="25"
            class="pa-3"
            :color="app ? 'blueProgress600' : 'blue800'"
        >
            <v-tabs-slider color="transparent"></v-tabs-slider>
            <v-tab
                :class="`rounded-pill no-uppercase mr-3 ${
                    app
                        ? 'bg-blueProgress600 black--text BUO-Display-Large'
                        : 'bg-white grey600--text'
                }`"
                active-class="bg-blue900 white--text"
                ><p class="BUO-Label-Small pt-3">Rotación</p>
            </v-tab>
            <v-tab
                :class="`rounded-pill no-uppercase mr-3 ${
                    app
                        ? 'bg-blueProgress600 black--text'
                        : 'bg-white grey600--text'
                }`"
                active-class="bg-blue900 white--text"
                ><p class="BUO-Label-Small pt-3">Desempeño</p>
            </v-tab>
            <v-tab
                :class="`rounded-pill no-uppercase mr-3 ${
                    app
                        ? 'bg-blueProgress600 black--text'
                        : 'bg-white grey600--text'
                }`"
                active-class="bg-blue900 white--text"
                ><p class="BUO-Label-Small pt-3">Crecimiento</p>
            </v-tab>
            <v-tab
                :class="`rounded-pill no-uppercase mr-3 ${
                    app ? 'bg-blueProgress600' : 'bg-white'
                }`"
                active-class="bg-blue900 white--text"
            >
                <v-icon small> mdi mdi-plus </v-icon>
            </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab" class="pa-5 mx-3 transparent">
            <v-tab-item>
                <v-row>
                    <v-col cols="12" md="4">
                        <StadisticCardViewComponent
                            title="Rotación"
                            :fnCallback="$_fnTest"
                            :percentage="4"
                            :isUp="false"
                            description="+0.5 vs el mes anterior"
                        />
                    </v-col>
                    <v-col cols="12" md="4">
                        <StadisticCardViewComponent
                            title="Rotación promedio"
                            :fnCallback="$_fnTest"
                            :percentage="12.5"
                            :isUp="false"
                            description="-3 vs el mes anterior"
                        />
                    </v-col>
                    <v-col cols="12" md="4">
                        <StadisticCardViewComponent
                            title="Attrition"
                            :fnCallback="$_fnTest"
                            :percentage="4.5"
                            :isUp="false"
                            description="-3.5 vs el mes anterior"
                        />
                    </v-col>
                    <v-col cols="12" md="4">
                        <StadisticCardViewComponent
                            title="Deserción"
                            :fnCallback="$_fnTest"
                            :percentage="10.5"
                            :isUp="true"
                            description="+2.8 vs el mes anterior"
                        />
                    </v-col>
                    <v-col cols="12" md="4">
                        <StadisticCardViewComponent
                            title="Prueba"
                            :fnCallback="$_fnTest"
                            :percentage="10.5"
                            :isUp="true"
                            description="+2.8 vs el mes anterior"
                        />
                    </v-col>
                    <v-col cols="12" md="4">
                        <StadisticCardViewComponent
                            title="Prueba"
                            :fnCallback="$_fnTest"
                            :percentage="10.5"
                            :isUp="true"
                            description="+2.8 vs el mes anterior"
                        />
                    </v-col>
                </v-row>
            </v-tab-item>

            <v-tab-item>
                <BaseNotFoundContent
                    img="https://buo-resources.s3.us-east-2.amazonaws.com/aproveBUO.png"
                    msg="¡Gracias por tu paciencia!  La función que buscas aún no está disponible, pero pronto lo
                    estará."
                />
            </v-tab-item>

            <v-tab-item>
                <BaseNotFoundContent
                    img="https://buo-resources.s3.us-east-2.amazonaws.com/aproveBUO.png"
                    msg="¡Gracias por tu paciencia!  La función que buscas aún no está disponible, pero pronto lo
                    estará."
                />
            </v-tab-item>

            <v-tab-item>
                <v-row>
                    <v-col cols="12" md="6">
                        <BaseBubblesChartViewComponent
                            title="% y número de salidas de colaboradores"
                            :entity="entity"
                            :showLegend="true"
                            positionLegend="right"
                        />
                    </v-col>
                </v-row>
            </v-tab-item>
        </v-tabs-items>
    </div>
</template>

<style scoped>
.bg-white {
    background-color: #ffffff;
}

.bg-blue900 {
    background-color: #003f5e !important;
}

.bg-blueProgress600 {
    background-color: #b9c9dc;
}
</style>
