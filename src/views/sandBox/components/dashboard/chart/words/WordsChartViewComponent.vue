<script>
/**
 * Descripción: Pantalla  WordsChartViewComponent
 *
 * @displayName WordsChartViewComponent
 *
 */

import { mapGetters } from 'vuex';

const BaseCardViewComponent = () =>
    import(
        '@/views/sandBox/components/dashboard/shared/card/BaseCardViewComponent'
    );

export default {
    name: 'WordsChartViewComponent',

    components: {
        BaseCardViewComponent,
    },

    computed: {
        ...mapGetters('theme', ['app']),

        fake() {
            return [
                { name: 'Salarios', value: '456', bold: true },
                { name: 'Días de vacaciones', value: '342', bold: false },
                { name: 'Ambiente laboral', value: '300', bold: true },
                { name: 'Beneficios', value: '148', bold: false },
                { name: 'Poca motivación', value: '148', bold: false },
                { name: 'Salarios', value: '456', bold: true },
                { name: 'Días de vacaciones', value: '342', bold: false },
                { name: 'Ambiente laboral', value: '300', bold: true },
                { name: 'Beneficios', value: '148', bold: false },
                { name: 'Poca motivación', value: '148', bold: false },
            ];
        },
    },
};
</script>

<template>
    <BaseCardViewComponent title="Motivos de rotación">
        <div slot="card-text">
            <v-container>
                <v-card
                    outlined
                    flat
                    class="rounded-lg ma-1"
                    v-for="(item, i) in fake"
                    :key="i"
                >
                    <v-card-text
                        :class="[app ? 'white--text' : 'grey700--text']"
                    >
                        <span>
                            {{ item.name }}
                        </span>
                    </v-card-text>
                </v-card>
            </v-container>
        </div>
    </BaseCardViewComponent>
</template>
