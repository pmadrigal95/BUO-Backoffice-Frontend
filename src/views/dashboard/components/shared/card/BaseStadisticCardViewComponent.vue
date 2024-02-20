<script>
/**
 * Descripción: Pantalla  BaseStadisticCardViewComponent
 *
 * @displayName BaseStadisticCardViewComponent
 *
 */

import { mapGetters } from 'vuex';

const BaseCardViewComponent = () =>
    import('@/views/dashboard/components/shared/card/BaseCardViewComponent');

export default {
    name: 'BaseStadisticCardViewComponent',

    props: {
        title: {
            type: String,
            default: undefined,
        },

        subtitle: {
            type: String,
            default: undefined,
        },

        description: {
            type: String,
            default: undefined,
        },

        fnCard: {
            type: Function,
            default: () => {},
        },

        directionContent: {
            type: String,
            default: 'flex-row',
        },

        justifyContent: {
            type: String,
            default: 'justify-start',
        },

        alignContent: {
            type: String,
            default: 'align-center',
        },

        colorIcon: {
            type: String,
            default: 'greenA800',
        },

        directionIcon: {
            type: String,
            default: undefined,
        },

        titleButton: {
            type: String,
            default: undefined,
        },

        fnButton: {
            type: Function,
            default: () => {},
        },

        directionButton: {
            type: String,
            default: 'justify-end',
        },

        /*Type alert as: success, info, warning, error or default*/
        type: {
            type: String,
            default: undefined,
        },
    },

    components: {
        BaseCardViewComponent,
    },

    computed: {
        ...mapGetters('theme', ['app']),

        getColorByType() {
            switch (this.type) {
                case 'sucess':
                    return 'greenA900';
                case 'info':
                    return 'blueProgress900';
                case 'warning':
                    return 'yellowWarning900';
                case 'error':
                    return 'redError900';
                default:
                    return 'grey700';
            }
        },
    },

    methods: {
        $_fnButton() {
            this.fnButton();
        },
    },
};
</script>

<template>
    <BaseCardViewComponent :title="title" :fnCallback="fnCard">
        <div slot="card-text">
            <section
                class="d-flex"
                :class="`${directionContent} ${justifyContent} ${alignContent}`"
            >
                <section class="flex-grow-0 flex-shrink-0">
                    <strong
                        class="pr-4 BUO-Display-XSmall"
                        :class="[
                            app ? 'cloud--text' : getColorByType + '--text',
                        ]"
                        >{{ this.subtitle }}</strong
                    >
                </section>

                <section>
                    <v-icon v-if="directionIcon" :color="colorIcon">{{
                        directionIcon === 'up' ? 'mdi-menu-up' : 'mdi-menu-down'
                    }}</v-icon>
                    <p
                        class="BUO-Label-XSmall"
                        :class="[app ? 'white--text' : 'grey700--text']"
                    >
                        {{ this.description }}
                    </p>
                </section>
            </section>
            <section v-if="titleButton">
                <section class="d-flex flex-row" :class="directionButton">
                    <v-btn
                        text
                        color="blue900"
                        @click="$_fnButton()"
                        class="BUO-Label-XSmall no-uppercase"
                        >{{ titleButton }}</v-btn
                    >
                </section>
            </section>
        </div>
    </BaseCardViewComponent>
</template>
