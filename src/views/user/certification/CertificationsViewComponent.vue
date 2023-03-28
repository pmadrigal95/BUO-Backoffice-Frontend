<script>
/**
 * Descripción: Pantalla  Certificaciones
 *
 * @displayName CertificationsViewComponent
 *
 */
const BaseCardViewComponent = () =>
    import('@/components/core/cards/BaseCardViewComponent');

const CertificationFilter = () =>
    import(
        '@/views/user/certification/components/CertificationsFilterViewComponent'
    );

export default {
    name: 'CertificationsViewComponent',

    components: {
        BaseCardViewComponent,
        CertificationFilter,
    },

    data() {
        return {
            tab: null,
        };
    },

    computed: {},
};
</script>

<template>
    <div>
        <BaseCardViewComponent title="Certificaciones">
            <div slot="card-text">
                <v-card flat>
                    <v-tabs
                        v-model="tab"
                        right
                        show-arrows
                        height="25"
                        class="pa-6 pt-5"
                    >
                        <v-tabs-slider color="transparent"></v-tabs-slider>
                        <v-tab class="rounded-pill no-uppercase"
                            >Pendientes</v-tab
                        >
                        <v-tab class="rounded-pill no-uppercase">
                            Aprobadas
                        </v-tab>
                        <v-tab class="rounded-pill no-uppercase">
                            Rechazadas</v-tab
                        >
                    </v-tabs>

                    <v-tabs-items v-model="tab" class="pa-5">
                        <v-tab-item>
                            <CertificationFilter
                                :statusCode="4"
                            ></CertificationFilter>
                        </v-tab-item>

                        <v-tab-item>
                            <CertificationFilter
                                :statusCode="5"
                            ></CertificationFilter>
                        </v-tab-item>

                        <v-tab-item>
                            <CertificationFilter
                                :statusCode="6"
                            ></CertificationFilter>
                        </v-tab-item>
                    </v-tabs-items>
                </v-card>
            </div>
        </BaseCardViewComponent>
    </div>
</template>
