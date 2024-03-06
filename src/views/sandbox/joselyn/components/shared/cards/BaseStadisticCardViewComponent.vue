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

        alignButton: {
            type: String,
            default: 'align-end',
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

        settingsByType() {
            switch (this.type) {
                case 'success':
                    return {
                        color: 'greenA900',
                        borderStyle: 'border-success',
                        icon: 'check-circle-outline',
                        showIcon: true,
                    };
                case 'info':
                    return {
                        color: 'blueProgress900',
                        borderStyle: 'border-info',
                        icon: 'information-outline',
                        showIcon: true,
                    };
                case 'warning':
                    return {
                        color: 'yellowWarning900',
                        borderStyle: 'border-warning',
                        icon: 'alert-outline',
                        showIcon: true,
                    };

                case 'error':
                    return {
                        color: 'redError900',
                        borderStyle: 'border-error',
                        icon: 'alert-octagon-outline',
                        showIcon: true,
                    };
                default:
                    return {
                        color: 'grey700',
                        showIcon: false,
                    };
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
    <BaseCardViewComponent
        :title="title"
        :fnCallback="fnCard"
        :class="settingsByType.borderStyle"
        :icon="settingsByType.icon"
        :iconColor="settingsByType.color"
        :showIcon="settingsByType.showIcon"
    >
        <div slot="card-text">
            <section
                class="d-flex"
                :class="`${directionContent} ${justifyContent} ${alignContent}`"
            >
                <section class="flex-grow-0 flex-shrink-0">
                    <strong
                        class="pr-4 BUO-Display-XSmall"
                        :class="[
                            app
                                ? 'cloud--text'
                                : settingsByType.color + '--text',
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
            <v-layout justify-end align-end v-if="titleButton">
                <v-btn
                    text
                    color="blue900"
                    @click="$_fnButton()"
                    class="BUO-Label-XSmall no-uppercase"
                    >{{ titleButton }}</v-btn
                >
            </v-layout>
        </div>
    </BaseCardViewComponent>
</template>

<style scoped>
.border-success {
    border: 1px solid #6dc629;
}

.border-info {
    border: 1px solid #174b89;
}

.border-warning {
    border: 1px solid #ffac00;
}

.border-error {
    border: 1px solid #dc3127;
}
</style>
