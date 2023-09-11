<script>
/**
 * Descripción: Pantalla
 *
 * @displayName DisplayViewComponent
 *
 */

import httpService from '@/services/axios/httpService';

import BaseArrayHelper from '@/helpers/baseArrayHelper';

const ProfileViewComponent = () =>
    import(
        '@/views/reports/demographics/pda/components/display/ProfileViewComponent'
    );

const AxesBehaviorViewComponent = () =>
    import(
        '@/views/reports/demographics/pda/components/display/AxesBehaviorViewComponent'
    );

const IndicatorsViewComponent = () =>
    import(
        '@/views/reports/demographics/pda/components/display/IndicatorsViewComponent'
    );

const ProfileAccumulatedViewComponent = () =>
    import(
        '@/views/reports/demographics/pda/components/display/ProfileAccumulatedViewComponent'
    );

const ProfileDistributionViewComponent = () =>
    import(
        '@/views/reports/demographics/pda/components/display/ProfileDistributionViewComponent'
    );

export default {
    name: 'DisplayViewComponent',

    props: {
        entity: {
            type: Object,
            requiered: true,
        },
    },

    components: {
        ProfileViewComponent,
        IndicatorsViewComponent,
        AxesBehaviorViewComponent,
        ProfileAccumulatedViewComponent,
        ProfileDistributionViewComponent,
    },

    data() {
        return {
            loading: false,
            report: undefined,
        };
    },

    computed: {
        isDepartmentFilter() {
            return this.entity.departmentId ? true : false;
        },

        pie() {
            return null;
        },

        bar() {
            return null;
        },

        radar() {
            return this.report.pdaAbilities;
        },

        axes() {
            return [
                {
                    id: 1,
                    nombre: 'Riesgo',
                    nombreUI: 'Eje de Riesgo',
                    etiquetaIzquierda: 'Cauteloso',
                    etiquetaDerecha: 'Arriesgado',
                    valorEjeFormato: '27',
                },
                {
                    id: 5,
                    nombre: 'Extroversion',
                    nombreUI: 'Eje de Extroversión',
                    etiquetaIzquierda: 'Introvertido',
                    etiquetaDerecha: 'Extrovertido',
                    valorEjeFormato: '64',
                },
                {
                    id: 7,
                    nombre: 'Paciencia',
                    nombreUI: 'Eje de Paciencia',
                    etiquetaIzquierda: 'Inquieto/Impaciente',
                    etiquetaDerecha: 'Calmo/Paciente',
                    valorEjeFormato: '9',
                },
                {
                    id: 12,
                    nombre: 'Normas',
                    nombreUI: 'Eje de Normas',
                    etiquetaIzquierda: 'Independiente',
                    etiquetaDerecha: 'Sujeto a normas',
                    valorEjeFormato: '100',
                },
                {
                    id: 13,
                    nombre: 'Autocontrol',
                    nombreUI: 'Eje de Autocontrol',
                    etiquetaIzquierda: 'Emocional',
                    etiquetaDerecha: 'Racional',
                    valorEjeFormato: '0',
                },
            ];
        },
    },

    created() {
        this.$_getObject();
    },

    methods: {
        /**
         * Determinar Reporte
         */
        $_getObject() {
            //HttpServices a la vista para obtener Vista
            this.loading = true;
            httpService.post('analytics/pda', this.entity).then((response) => {
                this.loading = false;
                if (response != undefined) {
                    console.log(response.data);
                    // Encontro la entidad
                    this.report = BaseArrayHelper.SetObject({}, response.data);
                }
            });
        },
    },
};
</script>

<template>
    <BaseSkeletonLoader v-if="loading" type="card" />
    <section v-else>
        <v-row dense>
            <v-col cols="12">
                <ProfileViewComponent
                    :entity="entity"
                    :profile="report.imageUrl"
                />
            </v-col>

            <v-col cols="12" md="6">
                <ProfileAccumulatedViewComponent :data="pie" />
            </v-col>

            <v-col cols="12" md="6">
                <IndicatorsViewComponent :data="radar" />
            </v-col>

            <v-col cols="12">
                <ProfileDistributionViewComponent :data="bar" />
            </v-col>

            <v-col cols="12">
                <AxesBehaviorViewComponent :data="axes" />
            </v-col>
        </v-row>
    </section>
</template>
