<script>
/**
 * Descripción: Menu Reutilizable
 *
 * @displayName menuCardViewComponent
 */

const BaseMenuCardDesktop = () =>
    import('@/components/core/cards/BaseMenuCardDesktop');

const BaseMenuCardMobile = () =>
    import('@/components/core/cards/BaseMenuCardMobile');

export default {
    name: 'menuCardViewComponent',

    props: {
        menuItems: {
            type: Array,
            required: true,
        },

        height: {
            type: String,
            default: '240',
        },

        size: {
            type: String,
            default: '125',
        },

        imgSmall: {
            type: Boolean,
            default: false,
        },
    },

    components: {
        BaseMenuCardDesktop,
        BaseMenuCardMobile,
    },
};
</script>

<template>
    <v-flex xs12 sm12 md12>
        <!--Desktop-->
        <BaseMenuCardDesktop
            v-if="$vuetify.breakpoint.mdAndUp"
            :menuItems="menuItems"
            :size="size"
            :imgSmall="imgSmall"
        />

        <!--Mobile-->
        <BaseMenuCardMobile
            v-else-if="$vuetify.breakpoint.mobile"
            :menuItems="menuItems"
            :height="height"
            :size="size"
        />
    </v-flex>
</template>
