<script>
/**
 * Descripción: Pantalla  BaseBubblesChartViewComponent
 *
 * @displayName BaseBubblesChartViewComponent
 *
 */
const BaseCardViewComponent = () =>
    import(
        '@/views/sandBox/components/dashboard/shared/card/BaseCardViewComponent'
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
                case 'left' || 'right':
                    return 'flex-column';
                case 'top' || 'bottom':
                    return 'flex-row';
                default:
                    return '';
            }
        },
    },
};
</script>

<template>
    <BaseCardViewComponent :title="title">
        <div slot="card-text">
            <section class="d-flex" :class="directionLegends">
                <section class="d-flex flex-row justify-center flex-grow-1">
                    <section class="mt-4">
                        <div class="rounded-pill blue900 big"></div>
                        <div class="rounded-pill blue900 xsmall ml-auto"></div>
                    </section>
                    <section class="">
                        <div class="rounded-pill blue900 medium mx-4"></div>
                        <section class="d-flex flex-row">
                            <div
                                class="rounded-pill blue900 small mt-2 mr-3"
                            ></div>
                            <div class="rounded-pill blue900 small mb-2"></div>
                        </section>
                    </section>
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
                        <p class="BUO-Label-XSmall grey700--text ">{{ item }}</p>
                    </section>
                </section>
            </section>
        </div>
    </BaseCardViewComponent>
</template>

<style scoped>
.big {
    grid-area: big;
}

.xsmall {
    grid-area: xsmall;
}

.medium {
    grid-area: medium;
}

.big {
    width: 142px;
    height: 142px;
}

.small {
    width: 60px;
    height: 60px;
}
.xsmall {
    width: 21px;
    height: 21px;
}

.medium {
    width: 107px;
    height: 107px;
}

.bubble {
    transition: transform 0.3s ease-in-out;
    /*animation: bounce 0.8s infinite alternate;*/
}

.bubble:hover {
    transform: scale(1.2);
    animation: none;
}

@keyframes bounce {
    to {
        transform: translateY(-10px);
    }
}
</style>
