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

        settings: {
            type: Object,
            requiered: true,
        },
    },

    components: {
        BaseCustomsButtonsGrid,
        BaseBasicCardViewComponent,
        BaseSlideCardViewComponent,
    },

    methods: {
        $_setVacancyId(item) {
            this.settings.vacancyId = item.id;
            this.settings.vacancyName = item.title;
            this.settings.step = 1;
        },
    },
};
</script>

<template>
    <BaseBasicCardViewComponent title="Vacantes abiertas">
        <section slot="top-actions">
            <!--TODO: Cambiar valores-->
            <BaseCustomsButtonsGrid
                disabled
                icon="mdi-plus"
                :outlined="true"
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
                    :callback="$_setVacancyId"
                    type="OpenVacantViewComponent"
                />
            </v-layout>
        </section>
    </BaseBasicCardViewComponent>
</template>
