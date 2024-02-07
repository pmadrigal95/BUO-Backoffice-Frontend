<script>
/**
 * Descripción: Atajos
 *
 * @displayName BaseShortcut
 */

import 'ninja-keys';

export default {
    name: 'BaseShortcut',

    props: {
        placeholder: {
            type: String,
            default: 'Buscar comando',
        },

        hotkeys: {
            type: Array,
            requiered: true,
        },
    },

    mounted() {
        this.$refs.ninjaKeys.data = this.hotkeys;
    },
};
</script>

<template>
    <ninja-keys ref="ninjaKeys" :placeholder="placeholder" hideBreadcrumbs />
</template>

<style>
ninja-keys {
    --ninja-z-index: 123;
}
</style>
