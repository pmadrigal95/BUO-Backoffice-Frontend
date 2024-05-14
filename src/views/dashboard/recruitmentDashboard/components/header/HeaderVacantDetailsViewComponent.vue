<script>
/**
 * Descripción: Pantalla  HeaderVacantDetailsViewComponent
 *
 * @displayName HeaderVacantDetailsViewComponent
 *
 */

import baseColorConfig from '@/views/dashboard/components/shared/row-display/color-percentage-display';

const BaseBasicCardViewComponent = () =>
    import(
        '@/views/dashboard/components/shared/card/BaseBasicCardViewComponent'
    );

const ProgressCircularComponent = () =>
    import(
        '@/views/dashboard/components/shared/chart/progressCircularChart/ProgressCircularComponent'
    );

export default {
    name: 'HeaderVacantDetailsViewComponent',

    props: {
        entity: {
            type: Object,
            requiered: true,
        },
    },

    components: { BaseBasicCardViewComponent, ProgressCircularComponent },

    computed: {
        color() {
            return baseColorConfig.$_setColor(
                this.entity.concidence ? this.entity.concidence : 0
            );
        },

        statusColor() {
            return this.entity.status == 2 ? 'greenA800' : 'redError900';
        },
    },
};
</script>

<template>
    <BaseBasicCardViewComponent v-if="entity">
        <section slot="card-text">
            <v-layout justify-start>
                <section class="d-flex flex-wrap mx-1">
                    <v-card flat class="px-2">
                        <v-card-title class="BUO-Label-Small-SemiBold">
                            Proceso de reclutamiento
                        </v-card-title>
                        <v-card-subtitle>
                            <v-chip small outlined :color="statusColor">
                                <span class="BUO-Label-XSmall-SemiBold my-2">{{
                                    entity.status == 2 ? 'Activo' : 'Inactivo'
                                }}</span>
                            </v-chip>
                        </v-card-subtitle>
                    </v-card>

                    <v-card flat class="px-2">
                        <v-card-title class="BUO-Label-Small-SemiBold">
                            Fecha de apertura
                        </v-card-title>
                        <v-card-subtitle class="BUO-Paragraph-Large">
                            {{ entity.openDate ? entity.openDate : 'N/A' }}
                        </v-card-subtitle>
                    </v-card>

                    <v-card flat class="px-2">
                        <v-card-title class="BUO-Label-Small-SemiBold">
                            Fecha de cierre
                        </v-card-title>
                        <v-card-subtitle class="BUO-Paragraph-Large">
                            {{ entity.endDate ? entity.endDate : 'N/A' }}
                        </v-card-subtitle>
                    </v-card>

                    <v-card flat class="px-2">
                        <v-card-title class="BUO-Label-Small-SemiBold">
                            Días faltantes
                        </v-card-title>
                        <v-card-subtitle class="BUO-Paragraph-Large">
                            {{
                                entity.missingDays ? entity.missingDays : 'N/A'
                            }}
                        </v-card-subtitle>
                    </v-card>

                    <v-card flat class="px-2">
                        <ProgressCircularComponent
                            class="mt-4"
                            title="Coincidencia"
                            :value="
                                entity.concidence
                                    ? entity.concidence.toFixed(2)
                                    : 0
                            "
                            :color="color"
                            isLandscape
                            isPercentage
                        />
                    </v-card>
                </section>
            </v-layout>
        </section>
    </BaseBasicCardViewComponent>
</template>
