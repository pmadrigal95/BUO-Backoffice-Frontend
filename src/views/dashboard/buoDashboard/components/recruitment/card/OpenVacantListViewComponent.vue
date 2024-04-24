<script>
/**
 * Descripción: Pantalla  OpenVacantListViewComponent
 *
 * @displayName OpenVacantListViewComponent
 *
 */

const BaseCustomsButtonsGrid = () =>
    import('@/components/core/grids/BaseCustomsButtonsGrid');

const BaseSlideCardViewComponent = () =>
    import(
        '@/views/dashboard/components/shared/slider/BaseSlideCardViewComponent'
    );

const BaseBasicCardViewComponent = () =>
    import(
        '@/views/dashboard/components/shared/card/BaseBasicCardViewComponent'
    );

export default {
    name: 'OpenVacantListViewComponent',

    props: {
        cardList: {
            type: Array,
            required: true,
        },
    },

    components: {
        BaseCustomsButtonsGrid,
        BaseBasicCardViewComponent,
        BaseSlideCardViewComponent,
    },
};
</script>

<template>
    <BaseBasicCardViewComponent title="Vacantes abiertas">
        <section slot="top-actions">
            <BaseCustomsButtonsGrid
                icon="mdi-plus"
                :outlined="false"
                label="Abrir vacantes"
                :fnMethod="() => {}"
            />
        </section>
        <section slot="card-text">
            <v-layout justify-center>
                <BaseSlideCardViewComponent
                    width="360px"
                    height="100%"
                    :chartData="cardList"
                    type="OpenVacantViewComponent"
                />
            </v-layout>
        </section>
    </BaseBasicCardViewComponent>
</template>
