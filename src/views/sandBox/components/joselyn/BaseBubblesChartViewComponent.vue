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
    components: {
        BaseCardViewComponent,
    },

    data() {
        return {
            bubbles: [
                { size: 142, order: 1 },
                { size: 107, order: 2 },
                { size: 60, order: 3 },
                { size: 60, order: 4 },
                { size: 21, order: 5 },
            ],
        };
    },

    computed: {
        sortedBubbles() {
            // Ordena las burbujas de mayor a menor tamaño
            return this.bubbles.slice().sort((a, b) => b.size - a.size);
        },
    },
};
</script>

<template>
    <div>
        <BaseCardViewComponent title="% y número de salidas de colaboradores">
            <div slot="card-text">
                <div>
                    <masonry
                        :cols="{ default: 4, '1100': 3, '700': 2, '500': 1 }"
                        gutter="30px"
                    >
                        <div
                            v-for="(bubble, index) in sortedBubbles"
                            :key="index"
                            class="rounded-pill blue900 bubble"
                            :style="{
                                width: bubble.size + 'px',
                                height: bubble.size + 'px',
                            }"
                        ></div>
                    </masonry>
                </div>
            </div>
        </BaseCardViewComponent>
        <BaseCardViewComponent title="% y número de salidas de colaboradores">
            <div slot="card-text">
                <section class="d-flex flex-row justify-center">
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
            </div>
        </BaseCardViewComponent>
    </div>
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
