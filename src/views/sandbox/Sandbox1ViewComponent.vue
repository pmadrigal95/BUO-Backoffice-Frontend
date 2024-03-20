<script>
/**
 * Descripción: Pantalla Sandbox 1
 *
 * @displayName Sandbox1ViewComponent
 *
 */

// const BaseInsightsCardViewComponent = () =>
//     import(
//         '@/views/dashboard/components/shared/info/BaseInsightsCardViewComponent'
//     );

// const BaseAIDrivenInsightsCardViewComponent = () =>
//     import(
//         '@/views/dashboard/components/shared/info/BaseAIDrivenInsightsCardViewComponent'
//     );

// const BaseInsightSmallCardViewComponent = () =>
//     import(
//         '@/views/dashboard/components/shared/info/BaseInsightSmallCardViewComponent'
//     );

// const BaseAIDrivenInsightViewComponent = () =>
//     import(
//         '@/views/dashboard/components/shared/insight/aiDrivenInsight/BaseAIDrivenInsightViewComponent'
//     );

// const BaseInsightViewComponent = () =>
//     import(
//         '@/views/dashboard/components/shared/insight/insight/BaseInsightViewComponent'
//     );

const BaseMixAiInsightViewComponent = () =>
    import(
        '@/views/dashboard/components/shared/insight/mixaiInsight/BaseMixAiInsightViewComponent'
    );

export default {
    name: 'Sandbox1ViewComponent',

    components: {
        // BaseInsightsCardViewComponent,
        // BaseAIDrivenInsightsCardViewComponent,
        // BaseInsightSmallCardViewComponent,
        // BaseAIDrivenInsightViewComponent,
        // BaseInsightViewComponent,
        BaseMixAiInsightViewComponent,
    },

    computed: {
        data1() {
            return [
                {
                    title: 'Capacitación 1',
                    description:
                        'Los colaboradores que tienen la capacitación 1 completada han tenido el mayor crecimiento',
                },
                {
                    title: '4,6 personas',
                    description:
                        'Cada año fiscal, entre 4 y 6 personas crecen a posiciones verticales',
                },
                {
                    title: '2,3 personas',
                    description:
                        'Cada año fiscal, entre 2 y 3 personas crecen a posiciones horizontales',
                },
            ];
        },

        data2() {
            return [
                {
                    title: 'Capacitación 1',
                    description:
                        'Los colaboradores que tienen la capacitación 1 completada han tenido el mayor crecimiento',
                },
                {
                    title: '4,6 personas',
                    description:
                        'Cada año fiscal, entre 4 y 6 personas crecen a posiciones verticales',
                },
                {
                    title: '2,3 personas',
                    description:
                        'Cada año fiscal, entre 2 y 3 personas crecen a posiciones horizontales',
                },
                {
                    title: 'Capacitación 1',
                    description:
                        'Los colaboradores que tienen la capacitación 1 completada han tenido el mayor crecimiento',
                },
                {
                    title: '4,6 personas',
                    description:
                        'Cada año fiscal, entre 4 y 6 personas crecen a posiciones verticales',
                },
                {
                    title: '2,3 personas',
                    description:
                        'Cada año fiscal, entre 2 y 3 personas crecen a posiciones horizontales',
                },
            ];
        },

        data3() {
            return [
                {
                    title: 'Capacitación 1',
                    description:
                        'Los colaboradores que tienen la capacitación 1 completada han tenido el mayor crecimiento',
                },
                {
                    title: '4,6 personas',
                    description:
                        'Cada año fiscal, entre 4 y 6 personas crecen a posiciones verticales',
                },
            ];
        },

        data4() {
            return [
                {
                    title: 'Capacitación 1',
                    description:
                        'Los colaboradores que tienen la capacitación 1 completada han tenido el mayor crecimiento',
                },
                {
                    title: '4,6 personas',
                    description:
                        'Cada año fiscal, entre 4 y 6 personas crecen a posiciones verticales',
                },
                {
                    title: '4,6 personas',
                    description:
                        'Cada año fiscal, entre 4 y 6 personas crecen a posiciones verticales',
                },
                {
                    title: '2,3 personas',
                    description:
                        'Cada año fiscal, entre 2 y 3 personas crecen a posiciones horizontales',
                },
            ];
        },

        insight1() {
            return { list: this.data1 };
        },

        insight2() {
            return { list: this.data3 };
        },

        aiDrivenInsight1() {
            return { list: this.data4, requiredInfo: false };
        },

        aiDrivenInsight2() {
            return { list: this.data2 };
        },
    },
};
</script>

<template>
    <section>
        <br />

        <!-- <h1>Sandbox 1</h1>

        <BaseInsightsCardViewComponent />

        <br />

        <BaseAIDrivenInsightsCardViewComponent />

        <br />

        <BaseInsightSmallCardViewComponent /> -->

        <!-- <BaseAIDrivenInsightViewComponent :list="data1" />

        <br />
        <br />

        <BaseInsightViewComponent :list="data2" />

        <br />
        <br />

        <BaseAIDrivenInsightViewComponent :list="data3" />

        <br />
        <br />

        <BaseInsightViewComponent :list="data4" /> -->

        <BaseMixAiInsightViewComponent
            :insight="insight1"
            :aiDrivenInsight="aiDrivenInsight1"
        />

        <BaseMixAiInsightViewComponent
            :insight="insight2"
            :aiDrivenInsight="aiDrivenInsight2"
        />

        <BaseMixAiInsightViewComponent :aiDrivenInsight="aiDrivenInsight2" />

        <BaseMixAiInsightViewComponent :insight="insight2" />

        <BaseMixAiInsightViewComponent :aiDrivenInsight="aiDrivenInsight1" />
    </section>
</template>
