<script>
/**
 * Descripción: Pantalla Base para la aplicación
 *
 * @displayName TheMain
 */

import TheLayout from '@/layouts/app/TheLayout.vue';

export default {
    name: 'TheMain',

    components: {
        TheLayout,
    },
};
</script>

<template>
    <TheLayout>
        <!-- @slot Use este slot para el contenido -->
        <div slot="RenderBody">
            <router-view />
        </div>
    </TheLayout>
</template>
