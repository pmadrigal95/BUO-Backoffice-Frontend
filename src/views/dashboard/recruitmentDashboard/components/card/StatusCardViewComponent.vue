<script>
/**
 * Descripción: Pantalla  StatusCardViewComponent
 *
 * @displayName StatusCardViewComponent
 *
 */

const BaseBasicCardViewComponent = () =>
    import(
        '@/views/dashboard/components/shared/card/BaseBasicCardViewComponent'
    );
const BaseStatusHeaderViewComponent = () =>
    import(
        '@/views/dashboard/components/shared/header/BaseStatusHeaderViewComponent'
    );

export default {
    name: 'StatusCardViewComponent',

    props: {
        title: {
            type: String,
            default: undefined,
        },

        chartData: {
            type: Array,
            requiered: true,
        },
    },

    components: { BaseBasicCardViewComponent, BaseStatusHeaderViewComponent },
};
</script>

<template>
    <BaseBasicCardViewComponent :title="title" v-if="chartData.length > 0">
        <section slot="card-text">
            <div v-for="(item, i) in chartData" :key="i" class="mb-n4">
                <BaseStatusHeaderViewComponent
                    :title="item.title"
                    :type="item.type"
                />
                <v-slider
                    class="mt-n4 mx-3"
                    readonly
                    inverse-label
                    v-if="item.value"
                    :value="item.value"
                    :label="`${item.value}%`"
                />
            </div>
        </section>
    </BaseBasicCardViewComponent>
</template>
