<script>
/**
 * Descripción: Pantalla  SandBox1
 *
 * @displayName SandBox2
 *
 */
import { mapGetters } from 'vuex';

const StadisticCardViewComponent = () =>
    import('@/views/sandBox/components/joselyn/StadisticCardViewComponent');

export default {
    name: 'SandBox2',

    components: {
        StadisticCardViewComponent,
    },

    data() {
        return {
            tab: null,
        };
    },

    computed: {
        ...mapGetters('theme', ['app']),
    },

    methods: {
        $_fnTest() {
            alert('hola');
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
                        ? 'bg-blueProgress600 black--text'
                        : 'bg-white grey600--text'
                }`"
                active-class="bg-blue900 white--text"
                >Rotación
            </v-tab>
            <v-tab
                :class="`rounded-pill no-uppercase mr-3 ${
                    app
                        ? 'bg-blueProgress600 black--text'
                        : 'bg-white grey600--text'
                }`"
                active-class="bg-blue900 white--text"
            >
                Desempeño
            </v-tab>
            <v-tab
                :class="`rounded-pill no-uppercase mr-3 ${
                    app
                        ? 'bg-blueProgress600 black--text'
                        : 'bg-white grey600--text'
                }`"
                active-class="bg-blue900 white--text"
            >
                Crecimiento
            </v-tab>
            <v-tab
                :class="`rounded-pill no-uppercase mr-3 ${
                    app ? 'bg-blueProgress600' : 'bg-white'
                }`"
                active-class="bg-blue900"
            >
                <v-icon small color="black"> mdi mdi-plus </v-icon>
            </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab" class="pa-5 mx-3 transparent">
            <v-tab-item>
                <v-row>
                    <v-col>
                        <StadisticCardViewComponent
                            title="Rotación"
                            :fnCallback="$_fnTest"
                            percentage="4"
                            :isUp="false"
                            description="+0.5 vs el mes anterior"
                        />
                    </v-col>
                    <v-col>
                        <StadisticCardViewComponent
                            title="Rotación promedio"
                            :fnCallback="$_fnTest"
                            percentage="12.5"
                            :isUp="false"
                            description="-3 vs el mes anterior"
                        />
                    </v-col>
                    <v-col>
                        <StadisticCardViewComponent
                            title="Attrition"
                            :fnCallback="$_fnTest"
                            percentage="4.5"
                            :isUp="false"
                            description="-3.5 vs el mes anterior"
                        />
                    </v-col>
                    <v-col>
                        <StadisticCardViewComponent
                            title="Deserción"
                            :fnCallback="$_fnTest"
                            percentage="10.5"
                            :isUp="true"
                            description="+2.8 vs el mes anterior"
                        />
                    </v-col>
                </v-row>
            </v-tab-item>

            <v-tab-item> hola 2 </v-tab-item>

            <v-tab-item> hola 3 </v-tab-item>

            <v-tab-item> Más </v-tab-item>
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
