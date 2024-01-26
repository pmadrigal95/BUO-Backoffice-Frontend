<script>
/**
 * Descripción: Pantalla  SandBox1
 *
 * @displayName SandBox2
 *
 */
import { mapGetters } from 'vuex';

import baseArrayHelper from '@/helpers/baseArrayHelper.js';

/*import baseDataVisualizationColorsHelper from '@/helpers/baseDataVisualizationColorsHelper';

import baseDataVisualizationColorsHelperPDA from '@/views/demographics/pda/components/shared/baseDataVisualizationColorsHelper';*/

const BaseNotFoundContent = () =>
    import('@/components/core/cards/BaseNotFoundContent');

const BaseStadisticCardViewComponent = () =>
    import('@/views/sandBox/components/joselyn/BaseStadisticCardViewComponent');

/*const BaseBubblesChartViewComponent = () =>
    import('@/views/sandBox/components/joselyn/BaseBubblesChartViewComponent');*/

const EmployeeDeparturesChartComponent = () =>
    import(
        '@/views/dashboard/buoDashboard/components/rotation/chart/bubbleChart/EmployeeDeparturesChartComponent'
    );

export default {
    name: 'SandBox2',

    components: {
        BaseNotFoundContent,
        BaseStadisticCardViewComponent,
        //BaseBubblesChartViewComponent,
        EmployeeDeparturesChartComponent,
    },

    data() {
        return {
            tab: null,
            entity: {},
            data: {
                labels: [
                    'Cautivadora',
                    'Encantadora',
                    'Amigable',
                    'Proactiva',
                    'Tenaz',
                ],
                data: [2, 1, 5, 8, 10],
                colors: [
                    'Cautivadora',
                    'Encantadora',
                    'Amigable',
                    'Proactiva',
                    'Tenaz',
                ],
            },
        };
    },

    computed: {
        ...mapGetters('theme', ['app']),

        chartData() {
            return {
                data: [2, 1, 3, 6, 8],
            };
        },

        sortChartData() {
            return baseArrayHelper.SortArray(this.chartData.data, 'desc');
        },
    },

    created() {
        //this.$_setEntity();
    },

    methods: {
        $_fnTest() {
            alert('hola');
        },

        $_setEntity() {
            //this.entity = this.$_mapperEntity();
        },

        /*$_setColor(isPDA, profile) {
            if (isPDA) {
                return baseDataVisualizationColorsHelperPDA.$_getColor({
                    profile: profile.toLowerCase(),
                    type: 'backgroundColor',
                });
            } else {
                return baseDataVisualizationColorsHelper.$_randomColor().main;
            }
        },*/

        /*$_mapperEntity() {
            const isPDA = true;
            return this.sortChartData.map((element, index) => ({
                name: 'a',
                value: element,
                iconLegend: 'mdi-circle-medium',
                color: this.$_setColor(isPDA, this.chartData.labels[index]),
                style: `size-${index}`,
                show: true,
            }));
        },*/
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
                        <BaseStadisticCardViewComponent
                            title="Attrition Risk"
                            :fnCallback="$_fnTest"
                            subtitle="4.5%"
                            colorIcon="greenA800"
                            directionIcon="down"
                            description="-3.5 vs el mes anterior"
                            alignContent="align-center"
                        />
                    </v-col>
                    <v-col cols="12" md="4">
                        <BaseStadisticCardViewComponent
                            title="Crecimiento"
                            subtitle="42"
                            description="personas"
                            alignContent="align-end"
                        />
                    </v-col>
                    <v-col cols="12" md="4">
                        <BaseStadisticCardViewComponent
                            title="Empleados"
                            subtitle="350"
                        />
                    </v-col>
                    <v-col cols="12" md="4">
                        <BaseStadisticCardViewComponent
                            title="Paridad de género"
                            subtitle="50%"
                            colorIcon="greenA800"
                            directionIcon="up"
                            description="+5 vs el mes anterior"
                            justifyContent="justify-center"
                        />
                    </v-col>
                    <v-col cols="12" md="4">
                        <BaseStadisticCardViewComponent
                            title="Edad promedio"
                            subtitle="40años"
                            colorIcon="greenA800"
                            directionIcon="up"
                            description="+3.5 vs el mes anterior"
                        />
                    </v-col>
                    <v-col cols="12" md="4">
                        <BaseStadisticCardViewComponent
                            title="Crecimiento promedio"
                            subtitle="8%"
                            colorIcon="redError900"
                            directionIcon="down"
                            description="+3.5 vs el mes anterior"
                            justifyContent="justify-center"
                            titleButton="Ver más"
                            :fnButton="$_fnTest"
                            directionButton="justify-end"
                        />
                    </v-col>
                    <v-col cols="12" md="4">
                        <BaseStadisticCardViewComponent
                            title="Deudas"
                            :fnCallback="$_fnTest"
                            subtitle="7"
                            description="deudas"
                            alignContent="align-end"
                        />
                    </v-col>
                    <v-col cols="12" md="4">
                        <BaseStadisticCardViewComponent
                            title="Salario"
                            :fnCallback="$_fnTest"
                            subtitle="$1000-1200"
                            description="mensuales"
                            directionContent="flex-column"
                            justifyContent="justify-end"
                            alignContent="align-start"
                        />
                    </v-col>
                    <v-col cols="12" md="4">
                        <BaseStadisticCardViewComponent
                            title="Estado cívil"
                            subtitle="casado"
                            iconCard="mdi-arrow-expand"
                            :fnCard="$_fnTest"
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
                        <!--  <BaseBubblesChartViewComponent
                            title="% y número de salidas de colaboradores"
                            :entity="entity"
                            :showLegend="true"
                            positionLegend="right"
                        />
                        -->
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" md="6">
                        <EmployeeDeparturesChartComponent :chartData="data" />
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
