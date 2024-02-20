<script>
/**
 * Descripción: Pantalla  DisplayViewComponent
 *
 * @displayName DisplayViewComponent
 *
 */

import httpService from '@/services/axios/httpService';

import BaseArrayHelper from '@/helpers/baseArrayHelper';

const BaseNotFoundContent = () =>
    import('@/components/core/cards/BaseNotFoundContent');

const HeaderViewComponent = () =>
    import('@/views/dashboard/components/shared/header/HeaderViewComponent');

const ReasonProgressViewComponent = () =>
    import(
        '@/views/dashboard/buoDashboard/components/rotation/chart/wordsChart/ReasonProgressViewComponent'
    );

const StatisticalRotationCardsViewComponent = () =>
    import(
        '@/views/dashboard/buoDashboard/components/rotation/card/StatisticalRotationCardsViewComponent'
    );

const BenefitViewComponent = () =>
    import(
        '@/views/dashboard/buoDashboard/components/rotation/chart/progressLinearChart/BenefitViewComponent'
    );

const HistoricalRotationChartComponent = () =>
    import(
        '@/views/dashboard/buoDashboard/components/rotation/chart/linealChart/HistoricalRotationChartComponent'
    );

const RotationViewComponent = () =>
    import(
        '@/views/dashboard/buoDashboard/components/rotation/chart/progressLinearChart/RotationViewComponent'
    );

const ExitInterviewsChartComponent = () =>
    import(
        '@/views/dashboard/buoDashboard/components/rotation/chart/pie/ExitInterviewsChartComponent'
    );

const ManagersRotationChartComponent = () =>
    import(
        '@/views/dashboard/buoDashboard/components/rotation/chart/pie/ManagersRotationChartComponent'
    );

const EmployeeDeparturesChartComponent = () =>
    import(
        '@/views/dashboard/buoDashboard/components/rotation/chart/bubbleChart/EmployeeDeparturesChartComponent'
    );

const DesertionSeniorityViewComponent = () =>
    import(
        '@/views/dashboard/buoDashboard/components/rotation/chart/progressLinearChart/DesertionSeniorityViewComponent'
    );

const AscendingPersonalitiesChartComponent = () =>
    import(
        '@/views/dashboard/buoDashboard/components/rotation/chart/bubbleChart/AscendingPersonalitiesChartComponent'
    );

export default {
    name: 'DisplayViewComponent',

    props: {
        filter: {
            type: Object,
            required: true,
        },

        innerWidth: {
            type: [Number, String],
            required: true,
        },
    },

    components: {
        BaseNotFoundContent,
        HeaderViewComponent,
        BenefitViewComponent,
        RotationViewComponent,
        ReasonProgressViewComponent,
        ExitInterviewsChartComponent,
        ManagersRotationChartComponent,
        DesertionSeniorityViewComponent,
        EmployeeDeparturesChartComponent,
        HistoricalRotationChartComponent,
        StatisticalRotationCardsViewComponent,
        AscendingPersonalitiesChartComponent,
    },

    data: () => ({
        loading: false,
        entity: undefined,
    }),

    computed: {
        hasData() {
            for (const [, value] of Object.entries(this.entity)) {
                if (value) {
                    return true;
                }
            }
            return false;
        },

        departmentRotationSize() {
            if (this.entity?.departmentRotation == null) {
                return 0;
            }

            const large = this.$_counter({
                quantityDispersion: this.entity?.quantityDispersion != null,
                reasonProgress: this.entity?.reasonProgress != null,
            });

            const medium = this.$_counter({
                quantityDispersion: this.entity?.quantityDispersion != null,
            });

            return this.$_setDisplay(medium, large);
        },

        quantityDispersionSize() {
            if (this.entity?.quantityDispersion == null) {
                return 0;
            }

            const large = this.$_counter({
                departmentRotation: this.entity?.departmentRotation != null,
                reasonProgress: this.entity?.reasonProgress != null,
            });

            const medium = this.$_counter({
                departmentRotation: this.entity?.departmentRotation != null,
            });

            return this.$_setDisplay(medium, large);
        },

        reasonProgressSize() {
            if (this.entity?.reasonProgress == null) {
                return 0;
            }

            const large = this.$_counter({
                departmentRotation: this.entity?.departmentRotation != null,
                quantityDispersion: this.entity?.quantityDispersion != null,
            });

            const medium = this.$_counter({
                managersPie: this.entity?.managersPie != null,
            });

            return this.$_setDisplay(medium, large);
        },

        managersPieSize() {
            if (this.entity?.managersPie == null) {
                return 0;
            }

            const large = this.$_counter({
                exitPie: this.entity?.exitPie != null,
                perks: this.entity?.perks != null,
            });

            const medium = this.$_counter({
                reasonProgress: this.entity?.reasonProgress != null,
            });

            return this.$_setDisplay(medium, large);
        },

        exitPieSize() {
            if (this.entity?.exitPie == null) {
                return 0;
            }

            const large = this.$_counter({
                managersPie: this.entity?.managersPie != null,
                perks: this.entity?.perks != null,
            });

            const medium = this.$_counter({
                perks: this.entity?.perks != null,
            });

            return this.$_setDisplay(medium, large);
        },

        perksSize() {
            if (this.entity?.perks == null) {
                return 0;
            }

            const large = this.$_counter({
                managersPie: this.entity?.managersPie != null,
                exitPie: this.entity?.exitPie != null,
            });

            const medium = this.$_counter({
                exitPie: this.entity?.exitPie != null,
            });

            return this.$_setDisplay(medium, large);
        },

        tenureProgressSize() {
            if (this.entity?.tenureProgress == null) {
                return 0;
            }

            const medium = this.$_counter({
                personalities: this.entity?.personalities != null,
            });

            return this.$_setDisplay(medium);
        },

        personalitiesSize() {
            if (this.entity?.personalities == null) {
                return 0;
            }

            const medium = this.$_counter({
                personalities: this.entity?.tenureProgress != null,
            });

            return this.$_setDisplay(medium);
        },
    },

    created() {
        this.$_getToAPi();
    },

    methods: {
        $_getToAPi() {
            this.loading = true;

            httpService
                .post('dashboard/rotacion/detalles', this.filter)
                .then((response) => {
                    this.loading = false;

                    if (response != undefined) {
                        //Logica JS luego de la acción exitosa!!!
                        this.entity = BaseArrayHelper.SetObject(
                            {},
                            response.data
                        );
                    }
                });
        },

        $_counter(row) {
            let counter = 0;

            // Using array methods
            Object.entries(row).forEach(([, value]) => {
                if (!value) {
                    counter++;
                }
            });

            return counter;
        },

        $_setSizeLarge(count) {
            switch (true) {
                case count == 0:
                    return 4;
                case count == 1:
                    return 6;
                default:
                    return 12;
            }
        },

        $_setSizeMedium(count) {
            switch (true) {
                case count == 0:
                    return 6;
                default:
                    return 12;
            }
        },

        $_setDisplay(medium, large) {
            switch (true) {
                case this.innerWidth <= 1024:
                    return 12;
                case this.innerWidth < 1800 && this.innerWidth > 1024:
                    return this.$_setSizeMedium(medium);
                default:
                    return large != undefined
                        ? this.$_setSizeLarge(large)
                        : this.$_setSizeMedium(medium);
            }
        },
    },
};
</script>

<template>
    <BaseSkeletonLoader
        v-if="loading"
        type="image, date-picker-days, date-picker-days, image"
    />
    <section v-else>
        <section v-if="hasData">
            <section class="mx-4">
                <HeaderViewComponent title="Rotación" />
                <section class="mb-6">
                    <StatisticalRotationCardsViewComponent
                        v-if="entity.cardList && entity.cardList.length > 0"
                        :chartData="entity.cardList"
                        height="auto"
                        width="auto"
                    />
                </section>
                <v-row>
                    <v-col cols="12" md="12" v-if="entity.historicUser">
                        <HistoricalRotationChartComponent
                            :chartData="entity.historicUser"
                        />
                    </v-col>

                    <v-col
                        cols="12"
                        :md="departmentRotationSize"
                        v-if="
                            entity.departmentRotation &&
                            entity.departmentRotation.length > 0
                        "
                    >
                        <RotationViewComponent
                            :chartData="entity.departmentRotation"
                        />
                    </v-col>

                    <v-col
                        cols="12"
                        :md="quantityDispersionSize"
                        v-if="entity.quantityDispersion"
                    >
                        <EmployeeDeparturesChartComponent
                            :chartData="entity.quantityDispersion"
                        />
                    </v-col>

                    <v-col
                        cols="12"
                        :md="reasonProgressSize"
                        v-if="
                            entity.reasonProgress &&
                            entity.reasonProgress.length > 0
                        "
                    >
                        <ReasonProgressViewComponent
                            :chartData="entity.reasonProgress"
                        />
                    </v-col>

                    <v-col
                        cols="12"
                        :md="managersPieSize"
                        v-if="entity.managersPie"
                    >
                        <ManagersRotationChartComponent
                            :chartData="entity.managersPie"
                        />
                    </v-col>

                    <v-col cols="12" :md="exitPieSize" v-if="entity.exitPie">
                        <ExitInterviewsChartComponent
                            :chartData="entity.exitPie"
                        />
                    </v-col>

                    <v-col
                        cols="12"
                        :md="perksSize"
                        v-if="entity.perks && entity.perks.length > 0"
                    >
                        <BenefitViewComponent :chartData="entity.perks" />
                    </v-col>

                    <v-col
                        cols="12"
                        :md="tenureProgressSize"
                        v-if="
                            entity.tenureProgress &&
                            entity.tenureProgress.length > 0
                        "
                    >
                        <DesertionSeniorityViewComponent
                            :chartData="entity.tenureProgress"
                        />
                    </v-col>

                    <v-col
                        cols="12"
                        :md="personalitiesSize"
                        v-if="entity.personalities"
                    >
                        <AscendingPersonalitiesChartComponent
                            :chartData="entity.personalities"
                        />
                    </v-col>
                </v-row>
            </section>
        </section>
        <BaseNotFoundContent
            v-else
            class="py-16 mt-4"
            msg="Lamentablemente, no se han encontrado datos al aplicar el filtro seleccionado."
        />
    </section>
</template>
