<script>
/**
 * Descripción: Componente Container de las notificaciones
 *
 * @displayName TheNotificationContainer
 */

import BaseNotificationBar from '@/components/core/alerts/BaseNotificationBar.vue';

import { mapState } from 'vuex';

export default {
    name: 'TheNotificationContainer',

    components: {
        BaseNotificationBar,
    },

    computed: mapState('notification', ['notifications']),
};
</script>

<template>
    <div class="notification-container">
        <BaseNotificationBar
            v-for="notification in notifications"
            :key="notification.id"
            :notification="notification"
        />
    </div>
</template>

<style scoped>
.notification-container {
    position: fixed;
    right: 0;
    z-index: 9999999999999999;
}
</style>
