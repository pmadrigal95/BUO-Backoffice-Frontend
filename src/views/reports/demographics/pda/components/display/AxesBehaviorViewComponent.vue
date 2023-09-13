<script>
/**
 * Descripción: Pantalla
 *
 * @displayName AxesBehaviorViewComponent
 *
 */

import { mapGetters } from 'vuex';

const BasePdaSlider = () => import('@/components/pda/BasePdaSlider');

const BaseCardViewComponent = () =>
    import(
        '@/views/reports/demographics/pda/components/shared/BaseCardViewComponent'
    );

export default {
    name: 'AxesBehaviorViewComponent',

    props: {
        isDepartmentFilter: {
            type: Boolean,
            default: false,
        },

        data: {
            type: Array,
            required: true,
        },
    },

    components: {
        BasePdaSlider,
        BaseCardViewComponent,
    },

    computed: {
        ...mapGetters('theme', ['app']),
    },
};
</script>

<template>
    <BaseCardViewComponent
        title="Ejes de comportamiento"
        :subtitle="`Promedio de ejes de comportamiento acumulado por ${
            isDepartmentFilter ? 'área' : 'empresa'
        }`"
    >
        <section slot="body">
            <BaseSkeletonLoader v-if="!data" type="card" />
            <section v-else>
                <div v-for="item in data" :key="item.id">
                    <v-card flat>
                        <v-card-title
                            class="buo-word-break BUO-Paragraph-Small-SemiBold pb-5"
                            :class="[app ? 'white--text' : 'black--text']"
                        >
                            {{ item.name }}
                        </v-card-title>
                        <v-card-text>
                            <BasePdaSlider :value="item.formattedValue" />
                            <section
                                class="d-flex flex-no-wrap justify-space-between buo-word-break"
                            >
                                <span
                                    class="BUO-Label-Small"
                                    :class="[
                                        app
                                            ? 'blueProgress600--text'
                                            : 'grey600--text',
                                    ]"
                                >
                                    {{ item.leftLabel }}
                                </span>
                                <span
                                    class="BUO-Label-Small"
                                    :class="[
                                        app
                                            ? 'blueProgress600--text'
                                            : 'grey600--text',
                                    ]"
                                >
                                    {{ item.rightLabel }}
                                </span>
                            </section>
                        </v-card-text>
                    </v-card>
                </div>
            </section>
        </section>
    </BaseCardViewComponent>
</template>
