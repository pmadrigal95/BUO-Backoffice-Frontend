<script>
/**
 * Descripción: Pantalla  BaseBubblesChartViewComponent
 *
 * @displayName BaseBubblesChartViewComponent
 *
 */
/*import baseDataVisualizationColorsHelperPDA from '@/views/demographics/pda/components/shared/baseDataVisualizationColorsHelper';*/

const BaseCardViewComponent = () =>
    import(
        '@/views/sandBox/components/dashboard/shared/card/BaseCardViewComponent'
    );

const BaseTooltipViewComponent = () =>
    import(
        '@/views/sandBox/components/dashboard/shared/tooltip/BaseTooltipViewComponent'
    );

export default {
    name: 'BaseBubblesChartViewComponent',

    props: {
        title: {
            type: String,
            default: undefined,
        },

        showLegend: {
            type: Boolean,
            default: true,
        },

        // top, bottom, left, right
        positionLegend: {
            type: String,
            requiered: true,
        },

        isPDA: {
            type: Boolean,
            default: false,
        },

        chartData: {
            type: Object,
            requiered: true,
        },
    },

    components: {
        BaseCardViewComponent,
        BaseTooltipViewComponent,
    },

    data() {
        return {
            entity: {},
        };
    },

    computed: {
        directionLegends() {
            switch (this.positionLegend) {
                case 'left':
                    return 'flex-row-reverse';
                case 'right':
                    return 'flex-row';
                case 'top':
                    return 'flex-column-reverse';
                case 'bottom':
                    return 'flex-column';
                default:
                    return '';
            }
        },

        directionLabels() {
            switch (this.positionLegend) {
                case 'left':
                case 'right':
                    return 'flex-column';
                case 'top':
                case 'bottom':
                    return 'flex-row';
                default:
                    return '';
            }
        },
    },

    created() {
        this.$_setToEntity();
    },

    methods: {
        $_setToEntity() {
            this.entity = this.$_mapperEntity();
        },

        $_mapperEntity() {
            const newEntity = this.chartData.data.map((element, index) => ({
                name: this.chartData.labels[index],
                value: element,
                color: this.isPDA
                    ? this.chartData.labels[index].toLowerCase()
                    : '',
                style: ' big order0',
            }));

            console.log(newEntity);

            console.log(this.chartData);

            return newEntity;
        },
    },
};
</script>

<template>
    <BaseCardViewComponent :title="title">
        <div slot="card-text">
            <section
                v-for="(item, index) in entity"
                :key="index"
                class="container"
            >
                <BaseTooltipViewComponent>
                    <div slot="activator">
                        <div class="circle rounded-pill" :class="`${item.style} ${item.color}`"></div>
                    </div>

                    <div slot="title" class="BUO-Label-XSmall grey700--text">
                        {{ item.name }}
                    </div>
                    <div slot="text" class="BUO-Paragraph-Medium">
                        {{ item.value }}
                    </div>
                    <div slot="actions">
                        <v-btn
                            class="no-uppercase rounded-lg BUO-Paragraph-Small-SemiBold"
                            color="blueProgress600"
                            elevation="0"
                            large
                            text
                        >
                            Ver más
                        </v-btn>
                    </div>
                </BaseTooltipViewComponent>
            </section>
            <section class="d-flex" :class="directionLegends">
                <section>
                    <h1>prueba</h1>
                </section>
                <section
                    v-if="showLegend"
                    class="d-flex"
                    :class="directionLabels"
                >
                    <section
                        v-for="(item, index) in chartData.labels"
                        :key="index"
                    >
                        <section class="d-flex flex-row align-center">
                            <v-icon color="blue900"> mdi-circle-medium </v-icon>
                            <p class="BUO-Label-XSmall grey700--text">
                                {{ item }}
                            </p>
                        </section>
                    </section>
                </section>
            </section>
        </div>
    </BaseCardViewComponent>
</template>

<style scoped>
.container {
    display: grid;
    grid-template-columns: 100px 100px 100px;
    grid-gap: 20px;
    justify-content: center;
}

.circle {
    align-self: flex-end;
}

.order0 {
    order: 0;
}

.order1 {
    order: 1;
}

.order2 {
    order: 2;
}

.order3 {
    order: 3;
}

.order4 {
    order: 4;
}

.order5 {
    order: 5;
}

/*.circle:nth-child(2) {
    order: 1;
}

.circle:nth-child(3) {
    order: 2;
}

.circle:nth-child(4) {
    order: 3;
}

.circle:nth-child(5) {
    order: 3;
    align-self: end;
}*/

.big {
    width: 142px;
    height: 142px;
}

.medium {
    width: 107px;
    height: 107px;
}

.small {
    width: 60px;
    height: 60px;
}
.xsmall {
    width: 21px;
    height: 21px;
}

.circle:hover {
    transform: scale(1.2);
    animation: none;
}

@keyframes bounce {
    to {
        transform: translateY(-10px);
    }
}
</style>
