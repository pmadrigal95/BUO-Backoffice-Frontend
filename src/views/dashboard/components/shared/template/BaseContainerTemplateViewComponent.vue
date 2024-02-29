<script>
/**
 * Descripción: Pantalla  BaseContainerTemplateViewComponent
 *
 * @displayName BaseContainerTemplateViewComponent
 *
 */

import { mapGetters, mapActions } from 'vuex';

const BaseNotFoundContent = () =>
    import('@/components/core/cards/BaseNotFoundContent');

export default {
    name: 'BaseContainerTemplateViewComponent',

    props: {
        type: {
            type: String,
            requiered: true,
        },
    },

    components: {
        BaseNotFoundContent,
    },

    computed: {
        ...mapGetters('dashboard', ['loading', 'dashboardById']),

        entity() {
            return this.dashboardById(this.type);
        },

        hasData() {
            if (!this.entity) return false;

            for (const [, value] of Object.entries(this.entity)) {
                if (value) {
                    return true;
                }
            }
            return false;
        },
    },

    created() {
        this.$_getToAPi();
    },

    methods: {
        ...mapActions('dashboard', ['set_dashboard_by_id']),

        $_getToAPi() {
            this.entity || this.set_dashboard_by_id(this.type);
        },
    },
};
</script>

<template>
    <BaseSkeletonLoader v-if="loading" type="card" />
    <section v-else>
        <section v-if="hasData">
            <slot name="container" />
        </section>
        <BaseNotFoundContent
            v-else
            class="py-16 mt-4"
            msg="Lamentablemente, no se han encontrado datos al aplicar el filtro seleccionado."
        />
    </section>
</template>
