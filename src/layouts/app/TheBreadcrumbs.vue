<script>
/**
 * Descripción: componente ayudante para la navegación de páginas
 *
 * @displayName TheBreadcrumbs
 */

export default {
    name: 'TheBreadcrumbs',

    props: {
        show: {
            type: Boolean,
            default: false,
        },
    },

    data() {
        return {
            key: this.$router.currentRoute.meta.module,
            componentKey: 0,
        };
    },

    watch: {
        $route() {
            this.key = this.$router.currentRoute.meta.module;
            this.componentKey = this.componentKey + 1;
        },
    },
};
</script>

<template>
    <v-breadcrumbs :key="componentKey">
        <v-breadcrumbs-item>
            <v-img
                contain
                max-width="67%"
                max-height="100%"
                :src="require('@/assets/app/common/buoLogo.svg')"
                v-if="$vuetify.breakpoint.mdAndUp"
            ></v-img>
        </v-breadcrumbs-item>
        <v-breadcrumbs-item class="BUO-Paragraph-Medium">
            {{ key }}
        </v-breadcrumbs-item>
    </v-breadcrumbs>
</template>
