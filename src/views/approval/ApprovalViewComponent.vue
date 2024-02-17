<script>
/**
 * Descripción: Pantalla  Certificaciones
 *
 * @displayName CertificationsViewComponent
 *
 */

import { mapGetters } from 'vuex';

import baseConfigHelper from '@/helpers/baseConfigHelper';

const BaseCardViewComponent = () =>
    import('@/components/core/cards/BaseCardViewComponent');

const FilterViewComponent = () =>
    import('@/views/approval/components/FilterViewComponent');

const BaseCustomsButtonsGrid = () =>
    import('@/components/core/grids/BaseCustomsButtonsGrid');

const BaseAdvancedFilter = () =>
    import('@/components/backoffice/filter/BaseAdvancedFilter');

export default {
    name: 'ApprovalViewComponent',

    components: {
        BaseAdvancedFilter,
        FilterViewComponent,
        BaseCardViewComponent,
        BaseCustomsButtonsGrid,
    },

    data() {
        return {
            tab: null,
            show: true,
            componentGrid: 0,
            entity: this.$_Object(),
        };
    },

    computed: {
        ...mapGetters('theme', ['app']),

        ...mapGetters('authentication', ['user', 'buoId']),

        certifying() {
            return baseConfigHelper.$_statusCode.certifying;
        },

        certificate() {
            return baseConfigHelper.$_statusCode.certificate;
        },

        rejected() {
            return baseConfigHelper.$_statusCode.rejected;
        },

        uncertified() {
            return baseConfigHelper.$_statusCode.uncertified;
        },
    },

    created() {
        this.show = this.user.companyId === this.buoId;
    },

    methods: {
        /**
         * Entity Object
         */
        $_Object() {
            return {
                companyId: undefined,
            };
        },

        $_showAdvFilter() {
            this.show = !this.show;
        },

        $_setParams() {
            this.componentGrid++;
        },
    },
};
</script>

<template>
    <BaseCardViewComponent
        title="Administración de las solicitudes y aprobaciones"
        subtitle="Controla con facilidad, impulsa el talento"
    >
        <div slot="body">
            <BaseAdvancedFilter :show="show" v-model="entity">
                <div slot="body">
                    <v-card flat class="rounded-t-xl">
                        <v-card-text>
                            <v-layout justify-end>
                                <BaseCustomsButtonsGrid
                                    label="Filtro Avanzado"
                                    :fnMethod="$_showAdvFilter"
                                    :outlined="!show"
                                    icon="mdi-filter-cog-outline"
                                    v-if="user.companyId === buoId"
                                />
                            </v-layout>

                            <section
                                v-if="entity.companyId"
                                :key="componentGrid"
                            >
                                <v-tabs
                                    v-model="tab"
                                    right
                                    show-arrows
                                    height="34"
                                >
                                    <v-tabs-slider
                                        color="transparent"
                                    ></v-tabs-slider>
                                    <v-tab
                                        class="rounded-pill no-uppercase mr-3"
                                        active-class="tab-active-blue"
                                        ><p class="BUO-Label-Small pt-4">
                                            Pendientes
                                        </p>
                                    </v-tab>

                                    <v-tab
                                        class="rounded-pill no-uppercase mr-3"
                                        active-class="tab-active-blue"
                                        ><p class="BUO-Label-Small pt-4">
                                            Aprobadas
                                        </p>
                                    </v-tab>

                                    <v-tab
                                        class="rounded-pill no-uppercase mr-3"
                                        active-class="tab-active-blue"
                                        ><p class="BUO-Label-Small pt-4">
                                            Rechazadas
                                        </p>
                                    </v-tab>

                                    <v-tab
                                        class="rounded-pill no-uppercase mr-3"
                                        active-class="tab-active-blue"
                                        ><p class="BUO-Label-Small pt-4">
                                            Asignadas
                                        </p>
                                    </v-tab>
                                </v-tabs>

                                <v-tabs-items v-model="tab" class="pa-5">
                                    <v-tab-item>
                                        <FilterViewComponent
                                            :statusCode="certifying"
                                            :companyId="entity.companyId"
                                            :updateGrid="$_setParams"
                                        />
                                    </v-tab-item>
                                    <v-tab-item>
                                        <FilterViewComponent
                                            :statusCode="certificate"
                                            :companyId="entity.companyId"
                                            :updateGrid="$_setParams"
                                        />
                                    </v-tab-item>
                                    <v-tab-item>
                                        <FilterViewComponent
                                            :statusCode="rejected"
                                            :companyId="entity.companyId"
                                            :updateGrid="$_setParams"
                                        />
                                    </v-tab-item>
                                    <v-tab-item>
                                        <FilterViewComponent
                                            :statusCode="uncertified"
                                            :companyId="entity.companyId"
                                            :updateGrid="$_setParams"
                                        />
                                    </v-tab-item>
                                </v-tabs-items>
                            </section>
                        </v-card-text>
                    </v-card>
                </div>
            </BaseAdvancedFilter>
        </div>
    </BaseCardViewComponent>
</template>
