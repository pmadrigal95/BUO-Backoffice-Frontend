<script>
/**
 * Descripción: Pantalla  BaseListStatusHeaderViewComponent
 *
 * @displayName BaseListStatusHeaderViewComponent
 *
 */

const BaseStatusHeaderViewComponent = () =>
    import(
        '@/views/dashboard/components/shared/header/BaseStatusHeaderViewComponent'
    );

export default {
    name: 'BaseListStatusHeaderViewComponent',

    props: {
        list: {
            type: Array,
            required: true,
        },
    },

    components: { BaseStatusHeaderViewComponent },
};
</script>

<template>
    <v-list dense color="transparent" v-if="list.length > 0">
        <div v-for="(item, i) in list" :key="i">
            <BaseStatusHeaderViewComponent
                :title="item.title"
                :type="item.type"
            />
        </div>
    </v-list>
</template>
