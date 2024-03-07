<script>
/**
 * Descripción: Pantalla  RecruitmentDashboardViewComponent
 *
 * @displayName RecruitmentDashboardViewComponent
 *
 */

import { mapGetters } from 'vuex';

const BaseCustomsButtonsGrid = () =>
    import('@/components/core/grids/BaseCustomsButtonsGrid');

const BaseTemplateViewComponent = () =>
    import(
        '@/views/dashboard/components/shared/template/BaseTemplateViewComponent'
    );

const ContainerViewComponent = () =>
    import(
        '@/views/dashboard/buoDashboard/components/recruitment/container/ContainerViewComponent'
    );

export default {
    name: 'RecruitmentDashboardViewComponent',

    components: {
        BaseCustomsButtonsGrid,
        BaseTemplateViewComponent,
        ContainerViewComponent,
    },

    computed: {
        ...mapGetters('theme', ['app']),

        type() {
            return 'recruitment';
        },
    },
};
</script>

<template>
    <BaseTemplateViewComponent title="Reclutamiento" :type="type">
        <section slot="custom-btns">
            <v-btn
                v-if="$vuetify.breakpoint.mobile"
                icon
                :color="app ? 'white' : 'blue900'"
            >
                <v-icon> mdi-plus-circle-outline </v-icon>
            </v-btn>
            <BaseCustomsButtonsGrid
                v-else
                icon="mdi-plus"
                :outlined="false"
                :fnMethod="() => {}"
                label="Abrir vacantes"
            />
        </section>
        <section slot="body">
            <ContainerViewComponent />
        </section>
    </BaseTemplateViewComponent>
</template>
