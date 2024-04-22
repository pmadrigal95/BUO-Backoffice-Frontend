<script>
/**
 * Descripción: Pantalla  BaseNotFoundCardViewComponent
 *
 * @displayName BaseNotFoundCardViewComponent
 *
 */

import { mapGetters } from 'vuex';

const BaseBasicCardViewComponent = () =>
    import(
        '@/views/dashboard/components/shared/card/BaseBasicCardViewComponent'
    );

export default {
    name: 'BaseNotFoundCardViewComponent',

    props: {
        description: {
            type: String,
            default: undefined,
        },
    },

    components: { BaseBasicCardViewComponent },

    computed: {
        ...mapGetters('theme', ['app']),
    },
};
</script>

<template>
    <BaseBasicCardViewComponent>
        <section slot="card-text">
            <v-card
                flat
                :color="app ? 'grey600' : 'grey200'"
                class="rounded-xxl"
            >
                <v-card-text :class="[app ? 'white--text' : 'grey700--text']">
                    <h1 class="BUO-Paragraph-Small text-center">
                        {{ description }}
                    </h1>
                </v-card-text>
            </v-card>
        </section>
    </BaseBasicCardViewComponent>
</template>
